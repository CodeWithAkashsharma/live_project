const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "superadmin"], default: "user" },
    adminRequested: { type: Boolean, default: false }, // <-- NEW
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
