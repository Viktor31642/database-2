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
