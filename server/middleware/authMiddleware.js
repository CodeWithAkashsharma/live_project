const jwt = require("jsonwebtoken");

// VERIFY TOKEN
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// VERIFY ADMIN
const verifyAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
  next();
};

// VERIFY SUPERADMIN
const verifySuperAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== "superadmin") return res.status(403).json({ message: "SuperAdmin only" });
  next();
};

module.exports = { verifyToken, verifyAdmin, verifySuperAdmin };
