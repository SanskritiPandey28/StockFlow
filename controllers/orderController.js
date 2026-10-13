
const { placeOrder } = require("../services/orderService");

// Place a new order for the authenticated customer
const createOrder = async (req, res) => {
    try {
        const userId = req.user.userId;

        const order = await placeOrder(userId);

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        console.error("Create order error:", error.message);

        if (error.message === "Cart is empty") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        if (
            error.message ===
            "No single warehouse has enough stock for all cart items"
        ) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to place order"
        });
    }
};

module.exports = {
    createOrder
};
