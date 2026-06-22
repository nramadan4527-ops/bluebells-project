const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");

// Auth routes
router.post("/login", authController.adminLogin);
router.post("/register", authController.registerAdmin);
router.get("/verify", authController.verifyToken);

module.exports = router;
