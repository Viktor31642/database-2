const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_123";
const TOKEN_EXPIRES_IN = "2h";

/**
 * Реєстрація користувача
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Заповніть всі обов’язкові поля" });

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email вже використовується" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Користувач створений успішно",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Помилка при реєстрації:", error);
    res.status(500).json({ message: "Помилка при створенні користувача" });
  }
};

/**
 * Логін користувача
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Користувача не знайдено" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "Невірний пароль" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

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
    console.error("Помилка при вході:", error);
    res.status(500).json({ message: "Помилка при вході" });
  }
};

/**
 * Отримати всіх користувачів (для адмінів)
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role", "created_at"],
      order: [["id", "ASC"]],
    });
    res.json(users);
  } catch (error) {
    console.error("Помилка при отриманні користувачів:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};
