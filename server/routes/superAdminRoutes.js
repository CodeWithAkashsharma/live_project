const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");

// Middleware to verify superadmin
const verifySuperAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied: SuperAdmin only" });
  }
  next();
};

// GET /api/admin/admin-requests — list users who requested admin
router.get("/admin-requests", verifyToken, verifySuperAdmin, async (req, res) => {
  try {
    const users = await User.find({ adminRequested: true, role: "user" }).select("_id fullname email");
    res.json({ requests: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/admin/approve-admin/:userId — approve a user to admin
router.post("/approve-admin/:userId", verifyToken, verifySuperAdmin, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = "admin";
    user.adminRequested = false; // reset the request flag
    await user.save();
    res.json({ message: `${user.fullname} is now an admin` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
