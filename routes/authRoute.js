const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { signUp, signIn } = require("../controller/authController");

router.post("/sign-up", signUp);
router.post("/sign-in", authMiddleware, signIn);

module.exports = router;
