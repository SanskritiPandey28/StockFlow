const express = require("express");

const {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createProductController
);

router.get(
    "/",
    authMiddleware,
    getAllProductsController
);

router.get(
    "/:id",
    authMiddleware,
    getProductByIdController
);

router.put("/:id", 
    authMiddleware, 
    updateProductController);


router.delete(
    "/:id",
    authMiddleware,
    deleteProductController
);


module.exports = router;