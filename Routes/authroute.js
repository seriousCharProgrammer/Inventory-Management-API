const express = require("express");
const { register, login, logout } = require("../Controllers/authCrontroller");
const { protect, authorize } = require("../Middlewares/authMiddleware");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(protect, logout);

module.exports = router;
