const {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
} = require("../services/inventoryService");


// CREATE INVENTORY
const createInventoryController = async (req, res) => {
    try {
        const { productId, warehouseId, quantity } = req.body;

        const inventory = await createInventory(
            productId,
            warehouseId,
            quantity
        );

        res.status(201).json({
            message: "Inventory created successfully",
            inventory: inventory
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// GET ALL INVENTORY
const getAllInventoryController = async (req, res) => {
    try {
        const inventory = await getAllInventory();

        res.status(200).json({
            inventory: inventory
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET INVENTORY BY ID
const getInventoryByIdController = async (req, res) => {
    try {
        const id = req.params.id;

        const inventory = await getInventoryById(id);

        if (!inventory) {
            return res.status(404).json({
                message: "Inventory not found"
            });
        }

        res.status(200).json({
            inventory: inventory
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE INVENTORY
const updateInventoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const { quantity } = req.body;

        const inventory = await updateInventory(
            id,
            quantity
        );

        if (!inventory) {
            return res.status(404).json({
                message: "Inventory not found"
            });
        }

        res.status(200).json({
            message: "Inventory updated successfully",
            inventory: inventory
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// DELETE INVENTORY
const deleteInventoryController = async (req, res) => {
    try {
        const id = req.params.id;

        const inventory = await deleteInventory(id);

        if (!inventory) {
            return res.status(404).json({
                message: "Inventory not found"
            });
        }

        res.status(200).json({
            message: "Inventory deleted successfully",
            inventory: inventory
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createInventoryController,
    getAllInventoryController,
    getInventoryByIdController,
    updateInventoryController,
    deleteInventoryController
};