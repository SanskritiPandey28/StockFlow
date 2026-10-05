const express = require("express");

const {
    createInventoryController,
    getAllInventoryController,
    getInventoryByIdController,
    updateInventoryController,
    deleteInventoryController
} = require("../controllers/inventoryController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE INVENTORY
router.post(
    "/",
    authMiddleware,
    createInventoryController
);


// GET ALL INVENTORY
router.get(
    "/",
    authMiddleware,
    getAllInventoryController
);


// GET INVENTORY BY ID
router.get(
    "/:id",
    authMiddleware,
    getInventoryByIdController
);


// UPDATE INVENTORY
router.put(
    "/:id",
    authMiddleware,
    updateInventoryController
);


// DELETE INVENTORY
router.delete(
    "/:id",
    authMiddleware,
    deleteInventoryController
);


module.exports = router;


//warehouse 6ac37fe076446567ef0efc2c
//products 6abce7edccd2caadea1203d5