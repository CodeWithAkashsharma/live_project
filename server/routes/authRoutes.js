const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyAdmin, verifySuperAdmin } = require("../middleware/authMiddleware");


// ===============================
// REGISTER (SIGNUP)
// ===============================
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role: "user",
      adminRequested: false,
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// LOGIN
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// USER REQUESTS ADMIN ACCESS
// ===============================
router.post("/request-admin", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "user")
      return res.status(400).json({ message: "You are already an admin" });

    if (user.adminRequested)
      return res.status(400).json({ message: "Request already sent" });

    user.adminRequested = true;
    await user.save();

    res.json({ message: "Admin request sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// SUPERADMIN — VIEW PENDING REQUESTS
// ===============================
router.get("/pending-admin-requests", verifyToken, verifySuperAdmin, async (req, res) => {
  try {
    const pending = await User.find({ adminRequested: true, role: "user" })
      .select("fullname email");

    res.json(pending);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// SUPERADMIN — APPROVE ADMIN
// ===============================
router.post("/approve-admin/:id", verifyToken, verifySuperAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    user.adminRequested = false;

    await user.save();

    res.json({ message: "User promoted to Admin" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
