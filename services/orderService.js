
const mongoose = require("mongoose");

const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");
const Order = require("../models/Orders");

// Place an order for the authenticated customer
const placeOrder = async (userId) => {
    const session = await mongoose.startSession();

    try {
        let createdOrder;

        await session.withTransaction(async () => {

            // 1. Fetch the customer's cart
            const cart = await Cart.findOne({ user: userId }).session(session);

            if (!cart || cart.items.length === 0) {
                throw new Error("Cart is empty");
            }

            // 2. Combine quantities if the same product appears more than once
            const quantityMap = new Map();

            for (const item of cart.items) {
                const productId = item.product.toString();

                quantityMap.set(
                    productId,
                    (quantityMap.get(productId) || 0) + item.quantity
                );
            }

            const productIds = [...quantityMap.keys()];

            // 3. Fetch products and their current prices from the database
            const products = await Product.find({
                _id: { $in: productIds }
            }).session(session);

            if (products.length !== productIds.length) {
                throw new Error("One or more products no longer exist");
            }

            const productMap = new Map();

            for (const product of products) {
                productMap.set(product._id.toString(), product);
            }

            // 4. Fetch inventory for all requested products
            const inventories = await Inventory.find({
                product: { $in: productIds }
            }).session(session);

            // 5. Group inventory by warehouse
            const warehouseMap = new Map();

            for (const inventory of inventories) {
                const warehouseId = inventory.warehouse.toString();
                const productId = inventory.product.toString();

                if (!warehouseMap.has(warehouseId)) {
                    warehouseMap.set(warehouseId, new Map());
                }

                warehouseMap.get(warehouseId).set(productId, inventory);
            }

            // 6. Find a single warehouse that can fulfill the entire cart
            let selectedWarehouseId = null;
            let selectedInventoryMap = null;

            for (const [warehouseId, warehouseInventory] of warehouseMap) {
                let canFulfill = true;

                for (const [productId, requiredQuantity] of quantityMap) {
                    const inventory = warehouseInventory.get(productId);

                    if (
                        !inventory ||
                        inventory.quantity < requiredQuantity
                    ) {
                        canFulfill = false;
                        break;
                    }
                }

                if (canFulfill) {
                    selectedWarehouseId = warehouseId;
                    selectedInventoryMap = warehouseInventory;
                    break;
                }
            }

            if (!selectedWarehouseId) {
                throw new Error(
                    "No single warehouse has enough stock for all cart items"
                );
            }

            // 7. Calculate prices and totals using database prices
            const orderItems = [];
            let totalAmount = 0;

            for (const [productId, quantity] of quantityMap) {
                const product = productMap.get(productId);

                if (
                    typeof product.price !== "number" ||
                    !Number.isFinite(product.price) ||
                    product.price < 0
                ) {
                    throw new Error(
                        `Invalid price for product ${productId}`
                    );
                }

                const subtotal = product.price * quantity;

                orderItems.push({
                    product: product._id,
                    quantity,
                    price: product.price,
                    subtotal
                });

                totalAmount += subtotal;
            }

            // 8. Deduct inventory safely
            // The quantity condition protects against overselling.
            for (const [productId, requiredQuantity] of quantityMap) {
                const inventory = selectedInventoryMap.get(productId);

                const result = await Inventory.updateOne(
                    {
                        _id: inventory._id,
                        quantity: { $gte: requiredQuantity }
                    },
                    {
                        $inc: { quantity: -requiredQuantity }
                    },
                    { session }
                );

                if (result.modifiedCount !== 1) {
                    throw new Error(
                        `Insufficient stock for product ${productId}`
                    );
                }
            }

            // 9. Create the order inside the same transaction
            const orders = await Order.create(
                [
                    {
                        customer: userId,
                        warehouse: selectedWarehouseId,
                        items: orderItems,
                        totalAmount,
                        status: "PLACED"
                    }
                ],
                { session }
            );

            createdOrder = orders[0];

            // 10. Clear the cart only after order creation
            await Cart.updateOne(
                { _id: cart._id },
                { $set: { items: [] } },
                { session }
            );
        });

        return createdOrder;

    } catch (error) {
        throw error;
    } finally {
        await session.endSession();
    }
};

module.exports = {
    placeOrder
};
