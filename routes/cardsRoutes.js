
const express = require("express");
const router = express.Router();

const {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  addPurchase,
  getAllPurchases,
  getPurchaseById,
  deletePurchase,
  updatePurchase,
} = require("../controllers/cardController");

const { requireAuth, requireRole } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   - name: Cards
 *     description: Операції з клубними картками
 *   - name: Purchases
 *     description: Операції з покупками клубних карток
 */

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Отримати всі клубні картки
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: Успішно отримано список карток
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   type:
 *                     type: string
 *                     example: "adult"
 *                   title:
 *                     type: string
 *                     example: "Adult Gym Membership"
 *                   price:
 *                     type: number
 *                     example: 599.99
 *                   benefits:
 *                     type: string
 *                     example: "Безлімітний доступ до спортзалу"
 */

/**
 * @swagger
 * /cards/{id}:
 *   get:
 *     summary: Отримати одну картку за ID
 *     tags: [Cards]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID картки
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Картка знайдена
 *       404:
 *         description: Картку не знайдено
 */

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Створити нову картку
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "child"
 *               title:
 *                 type: string
 *                 example: "Дитяча карта"
 *               price:
 *                 type: number
 *                 example: 299.99
 *               benefits:
 *                 type: string
 *                 example: "Доступ до дитячої зони"
 *     responses:
 *       201:
 *         description: Картку створено
 *       400:
 *         description: Помилка при створенні
 */

/**
 * @swagger
 * /cards/{id}:
 *   put:
 *     summary: Оновити картку
 *     tags: [Cards]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID картки для оновлення
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Оновлена карта"
 *               price:
 *                 type: number
 *                 example: 399.99
 *     responses:
 *       200:
 *         description: Картку оновлено
 *       404:
 *         description: Картку не знайдено
 */

/**
 * @swagger
 * /cards/{id}:
 *   delete:
 *     summary: Видалити картку
 *     tags: [Cards]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID картки для видалення
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Картку видалено
 *       404:
 *         description: Картку не знайдено
 */

/**
 * @swagger
 * /purchase:
 *   post:
 *     summary: Створити покупку (доступно всім користувачам)
 *     tags: [Purchases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               card_id:
 *                 type: integer
 *                 example: 3
 *               firstName:
 *                 type: string
 *                 example: "Іван"
 *               lastName:
 *                 type: string
 *                 example: "Петренко"
 *               phone:
 *                 type: string
 *                 example: "+380501234567"
 *               asGift:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Покупку створено успішно
 *       400:
 *         description: Помилка при створенні покупки
 */

/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: Отримати всі покупки
 *     tags: [Purchases]
 *     responses:
 *       200:
 *         description: Список покупок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   card_id:
 *                     type: integer
 *                   asGift:
 *                     type: boolean
 */

/**
 * @swagger
 * /purchases/{id}:
 *   get:
 *     summary: Отримати покупку за ID
 *     tags: [Purchases]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID покупки
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Покупка знайдена
 *       404:
 *         description: Не знайдено
 */

/**
 * @swagger
 * /purchases/{id}:
 *   put:
 *     summary: Оновити покупку
 *     tags: [Purchases]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID покупки
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Оновлене ім’я"
 *               phone:
 *                 type: string
 *                 example: "+380931234567"
 *     responses:
 *       200:
 *         description: Покупку оновлено
 *       404:
 *         description: Не знайдено
 */

/**
 * @swagger
 * /purchases/{id}:
 *   delete:
 *     summary: Видалити покупку
 *     tags: [Purchases]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Покупку видалено
 *       404:
 *         description: Не знайдено
 */

// Реальні маршрути:
router.get("/cards", getAllCards);
router.get("/cards/:id", getCardById);
router.post("/cards", createCard);
router.put("/cards/:id", updateCard);
router.delete("/cards/:id", deleteCard);

// Покупки
router.post("/purchase", addPurchase);
router.get("/purchases", getAllPurchases);
router.get("/purchases/:id", getPurchaseById);
router.delete("/purchases/:id", deletePurchase);
router.put("/purchases/:id", updatePurchase);

module.exports = router;
