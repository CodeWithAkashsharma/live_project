const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware"); // ensure user is logged in

// ----------------------
// User requests admin role
// ----------------------
router.post("/request-admin", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "user")
      return res.status(400).json({ message: "Only regular users can request admin access" });

    if (user.adminRequested)
      return res.status(400).json({ message: "Admin request already sent" });

    user.adminRequested = true;
    await user.save();

    return res.json({ message: "Admin access request sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// Superadmin views pending admin requests
// ----------------------
router.get("/pending-admin-requests", verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(403).json({ message: "Access denied" });

  try {
    const pendingUsers = await User.find({ adminRequested: true, role: "user" }).select(
      "-password"
    ); // exclude password
    res.json(pendingUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// Superadmin approves admin request
// ----------------------
router.post("/approve-admin/:id", verifyToken, async (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(403).json({ message: "Access denied" });

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    user.adminRequested = false;
    await user.save();

    res.json({ message: "User promoted to admin" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
