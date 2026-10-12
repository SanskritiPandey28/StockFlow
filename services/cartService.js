
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const Inventory = require("../models/Inventory");

// CREATE CART
const createCart = async (userId) => {
    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Check if cart already exists
    const existingCart = await Cart.findOne({
        user: userId
    });

    if (existingCart) {
        throw new Error("Cart already exists");
    }

    // Create new empty cart
    const cart = new Cart({
        user: userId,
        items: []
    });

    await cart.save();

    return cart;
};


// GET USER CART
const getCart = async (userId) => {
    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    let cart = await Cart.findOne({
        user: userId
    }).populate("items.product");

    // Create an empty cart if one doesn't exist
    if (!cart) {
        cart = new Cart({
            user: userId,
            items: []
        });

        await cart.save();
    }

    return cart;
};


// ADD PRODUCT TO CART
const addToCart = async (userId, productId, quantity) => {
    // Validate quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Invalid quantity");
    }

    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    // Find user's cart
    const cart = await Cart.findOne({
        user: userId
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    // Find all inventory records for this product
    const inventory = await Inventory.find({
        product: productId
    });

    // Calculate total physical stock
    let totalStock = 0;

    for (const inventoryItem of inventory) {
        totalStock += inventoryItem.quantity;
    }

    // Find product in cart
    let found = false;

    for (const cartItem of cart.items) {
        if (cartItem.product.toString() === productId.toString()) {
            found = true;

            // Adding means increasing existing quantity
            const newCartQuantity = cartItem.quantity + quantity;

            if (newCartQuantity > totalStock) {
                throw new Error("Not sufficient product");
            }

            cartItem.quantity = newCartQuantity;
            break;
        }
    }

    // Product is not already in cart
    if (!found) {
        if (quantity > totalStock) {
            throw new Error("Not sufficient product");
        }

        cart.items.push({
            product: productId,
            quantity: quantity
        });
    }

    await cart.save();

    return cart;
};


// REMOVE PRODUCT FROM CART
const removeCart = async (userId, productId) => {
    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Find user's cart
    const cart = await Cart.findOne({
        user: userId
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    // Remove the product from cart
    const oldLength = cart.items.length;

    cart.items = cart.items.filter((cartItem) => {
        return cartItem.product.toString() !== productId.toString();
    });

    // Check if product existed in cart
    if (cart.items.length === oldLength) {
        throw new Error("Product not found in cart");
    }

    await cart.save();

    return cart;
};


// UPDATE CART ITEM QUANTITY
const updateCartQuantity = async (userId, productId, quantity) => {
    // Validate quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Invalid quantity");
    }

    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Find user's cart
    const cart = await Cart.findOne({
        user: userId
    });

    if (!cart) {
        throw new Error("Cart does not exist");
    }

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    // Find inventory for this product
    const inventory = await Inventory.find({
        product: productId
    });

    // Calculate total physical stock
    let totalStock = 0;

    for (const inventoryItem of inventory) {
        totalStock += inventoryItem.quantity;
    }

    // Find the product in the cart
    let found = false;

    for (const cartItem of cart.items) {
        if (cartItem.product.toString() === productId.toString()) {
            found = true;

            if (quantity > totalStock) {
                throw new Error("Not sufficient product");
            }

            // Updating means replacing the quantity
            cartItem.quantity = quantity;
            break;
        }
    }

    if (!found) {
        throw new Error("Product not found in cart");
    }

    await cart.save();

    return cart;
};


// EXPORT SERVICES
module.exports = {
    createCart,
    getCart,
    addToCart,
    removeCart,
    updateCartQuantity
};
