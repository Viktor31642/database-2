const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "super_secret_key_123";

// Реєстрація
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email вже використовується" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    res.json({ message: "Користувач створений", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Помилка при створенні користувача", error });
  }
});

// Логін
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "Користувача не знайдено" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Невірний пароль" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    // ✅ Додай об’єкт user у відповідь
    res.json({
      message: "Успішний вхід",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Помилка при вході", error });
  }
});



module.exports = router;
