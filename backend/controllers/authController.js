const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login admin
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    
    if (!admin.isActive) return res.status(403).json({ message: "Account is deactivated" });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.json({ token, admin: adminResponse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Verify token
const verify = async (req, res) => {
  try {
    // The auth middleware already decoded the token and attached admin.id
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) return res.status(401).json({ message: "Invalid token: Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { login, verify };
