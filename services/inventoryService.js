const Inventory = require("../models/Inventory");
const Product = require("../models/Product");
const Warehouse = require("../models/Warehouse");


// CREATE INVENTORY
const createInventory = async (productId, warehouseId, quantity) => {

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }


    // Check if warehouse exists
    const warehouse = await Warehouse.findById(warehouseId);

    if (!warehouse) {
        throw new Error("Warehouse not found");
    }


    // Check if inventory already exists
    const existingInventory = await Inventory.findOne({
        product: productId,
        warehouse: warehouseId
    });

    if (existingInventory) {
        throw new Error(
            "Inventory already exists for this product and warehouse"
        );
    }


    // Create inventory
    const inventory = new Inventory({
        product: productId,
        warehouse: warehouseId,
        quantity
    });

    await inventory.save();

    return inventory;
};


// GET ALL INVENTORY
const getAllInventory = async () => {

    const inventory = await Inventory.find()
        .populate("product")
        .populate("warehouse");

    return inventory;
};


// GET INVENTORY BY ID
const getInventoryById = async (id) => {

    const inventory = await Inventory.findById(id)
        .populate("product")
        .populate("warehouse");

    return inventory;
};


// UPDATE INVENTORY
const updateInventory = async (id, quantity) => {

    const inventory = await Inventory.findByIdAndUpdate(
        id,
        {
            quantity
        },
        {
            new: true,
            runValidators: true
        }
    )
        .populate("product")
        .populate("warehouse");

    return inventory;
};


// DELETE INVENTORY
const deleteInventory = async (id) => {

    const inventory = await Inventory.findByIdAndDelete(id);

    return inventory;
};


module.exports = {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
};

