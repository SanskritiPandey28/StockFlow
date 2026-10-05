const express = require("express");

const {
    createWarehouseController,
    getAllWarehousesController,
    getWarehouseByIdController,
    updateWarehouseController,
    deleteWarehouseController
} = require("../controllers/warehouseController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE WAREHOUSE
router.post(
    "/",
    authMiddleware,
    createWarehouseController
);


// GET ALL WAREHOUSES
router.get(
    "/",
    authMiddleware,
    getAllWarehousesController
);


// GET WAREHOUSE BY ID
router.get(
    "/:id",
    authMiddleware,
    getWarehouseByIdController
);

router.put("/:id",
    authMiddleware,
    updateWarehouseController
)

router.delete("/:id", 
    authMiddleware,
    deleteWarehouseController
)

module.exports = router;