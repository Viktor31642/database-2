// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const JWT_SECRET = "super_secret_key_123";

// // Реєстрація
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, role = "user" } = req.body;
//     const existing = await User.findOne({ where: { email } });
//     if (existing) return res.status(400).json({ message: "Email вже використовується" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ name, email, password: hashedPassword, role });
//     res.json({ message: "Користувач створений", user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: "Помилка при створенні користувача", error });
//   }
// });

// // Логін
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });

//     if (!user) return res.status(400).json({ message: "Користувача не знайдено" });

//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(400).json({ message: "Невірний пароль" });

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       JWT_SECRET,
//       { expiresIn: "2h" }
//     );

//     // ✅ Додай об’єкт user у відповідь
//     res.json({
//       message: "Успішний вхід",
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Помилка при вході", error });
//   }
// });



// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { register, login, getAllUsers } = require("../controllers/authController");
// const { requireAuth, requireRole } = require("../middleware/auth");

// // Маршрути
// router.post("/register", register);
// router.post("/login", login);
// router.get("/users", getAllUsers);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { register, login, getAllUsers } = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Реєстрація, логін та управління користувачами
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Іван Іванов"
 *               email:
 *                 type: string
 *                 example: "ivan@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       201:
 *         description: Користувача створено успішно
 *       400:
 *         description: Email вже використовується
 *       500:
 *         description: Помилка при створенні користувача
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Авторизація користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Успішний вхід
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Успішний вхід"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Невірний email або пароль
 *       500:
 *         description: Помилка при вході
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Отримати список усіх користувачів
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список користувачів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     example: "2025-11-04T12:30:00Z"
 *       401:
 *         description: Неавторизовано
 */
router.get("/users", getAllUsers);

module.exports = router;
