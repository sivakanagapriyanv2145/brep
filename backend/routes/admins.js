const express = require("express");
const router = express.Router();
const {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
} = require("../controllers/adminController");
const auth = require("../middleware/auth");

// Public route to create the first admin
router.post("/", createAdmin);

// Profile routes (auth needed)
router.get("/profile", auth, getAdminProfile);
router.put("/profile", auth, updateAdminProfile);
router.put("/profile/password", auth, changePassword);

// Protected routes (auth needed, typically for super_admins)
router.get("/", auth, getAdmins);
router.get("/:id", auth, getAdminById);
router.put("/:id", auth, updateAdmin);
router.delete("/:id", auth, deleteAdmin);

module.exports = router;
