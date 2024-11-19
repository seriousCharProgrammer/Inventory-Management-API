const express = require("express");
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../Controllers/UserControllers");
const { protect, authorize } = require("../Middlewares/authMiddleware");

const router = express.Router();
router
  .route("/")
  .get(protect, authorize("admin"), getAllUsers)
  .post(protect, authorize("admin"), createUser);
router
  .route("/:id")
  .get(protect, authorize("admin"), getOneUser)
  .put(protect, authorize("admin"), updateUser)
  .delete(protect, authorize("admin"), deleteUser);
module.exports = router;
