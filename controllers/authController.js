const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret_key_change_me";
const JWT_EXPIRES = "2h";

// POST /api/auth/register  (разово для створення адміна)
exports.register = async (req, res) => {
  try {
    const { email, password, role = "admin" } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email & password required" });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ error: "User already exists" });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password_hash, role });

    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { uid: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
};
const User = require("../models/User");

// --- Отримати всіх користувачів (лише для admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role", "created_at"], // які поля повертати
      order: [["id", "ASC"]],
    });
    res.json(users);
  } catch (error) {
    console.error("Помилка при отриманні користувачів:", error);
    res.status(500).json({ error: "Помилка сервера" });
  }
};