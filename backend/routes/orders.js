const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticateToken } = require("../middleware/auth");

// Public routes
router.post("/", orderController.createOrder);
router.get("/search", orderController.getOrdersByPhone);
router.get("/:id", orderController.getOrderById);

// Protected routes (admin only)
router.get("/", authenticateToken, orderController.getAllOrders);
router.put("/:id", authenticateToken, orderController.updateOrderStatus);
router.delete("/:id", authenticateToken, orderController.cancelOrder);

module.exports = router;
