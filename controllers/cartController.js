
const cartService = require("../services/cartService");

// CREATE CART
const createCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cart = await cartService.createCart(userId);

        return res.status(201).json({
            success: true,
            message: "Cart created successfully",
            cart
        });
    } catch (error) {
        console.error("Create cart error:", error.message);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// GET USER CART
const getCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cart = await cartService.getCart(userId);

        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            cart
        });
    } catch (error) {
        console.error("Get cart error:", error.message);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ADD PRODUCT TO CART
const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId, quantity } = req.body;

        const cart = await cartService.addToCart(
            userId,
            productId,
            quantity
        );

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart
        });
    } catch (error) {
        console.error("Add to cart error:", error.message);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// REMOVE PRODUCT FROM CART
const removeCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.body;

        const cart = await cartService.removeCart(userId, productId);

        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            cart
        });
    } catch (error) {
        console.error("Remove cart item error:", error.message);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE CART ITEM QUANTITY
const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId, quantity } = req.body;

        const cart = await cartService.updateCartQuantity(
            userId,
            productId,
            quantity
        );

        return res.status(200).json({
            success: true,
            message: "Cart quantity updated successfully",
            cart
        });
    } catch (error) {
        console.error("Update cart quantity error:", error.message);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createCart,
    getCart,
    addToCart,
    removeCart,
    updateCartQuantity
};
