require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { verifyToken, verifyAdmin } = require("./middleware/authMiddleware");
const superAdminRoutes = require("./routes/superAdminRoutes");

const app = express();

// MIDDLEWARE - should be BEFORE routes
app.use(cors());
app.use(express.json()); 

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", superAdminRoutes);

// TEST ROUTES
app.get("/api/test/user", verifyToken, (req, res) => {
  res.json({ message: "User verified", user: req.user });
});

app.get("/api/test/admin", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "Admin verified", user: req.user });
});

// DATABASE
connectDB();

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
