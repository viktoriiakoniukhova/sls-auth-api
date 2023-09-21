const express = require("express");
const { getCurrentUser } = require("../controller/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
