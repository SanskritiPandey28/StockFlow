
const express = require("express");
const router = express.Router();

const {
    createCart,
    getCart,
    addToCart,
    removeCart,
    updateCartQuantity
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");

// All cart routes require authentication
router.post("/", authMiddleware, createCart);

router.get("/", authMiddleware, getCart);

router.post("/add", authMiddleware, addToCart);

router.patch("/update", authMiddleware, updateCartQuantity);

router.delete("/remove", authMiddleware, removeCart);



module.exports = router;
