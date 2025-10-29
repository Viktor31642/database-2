const ClubCard = require("../models/ClubCard");
const Purchase = require("../models/Purchase");

/* ==================== КАРТКИ ==================== */

exports.getAllCards = async (req, res) => {
  try {
    const cards = await ClubCard.findAll();
    res.json(cards);
  } catch (err) {
    console.error("Помилка отримання:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await ClubCard.findByPk(id);
    if (!card) return res.status(404).json({ error: "Картку не знайдено" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.createCard = async (req, res) => {
  try {
    const { type, title, price, benefits } = req.body;
    const newCard = await ClubCard.create({ type, title, price, benefits });
    res.status(201).json({ message: "✅ Картку створено", newCard });
  } catch (err) {
    res.status(500).json({ error: "Не вдалося створити картку" });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await ClubCard.findByPk(id);
    if (!card) return res.status(404).json({ error: "Картку не знайдено" });
    await card.update(req.body);
    res.json({ message: "✅ Картку оновлено", card });
  } catch (err) {
    res.status(500).json({ error: "Помилка оновлення" });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await ClubCard.findByPk(id);
    if (!card) return res.status(404).json({ error: "Картку не знайдено" });
    await card.destroy();
    res.json({ message: "🗑️ Картку видалено" });
  } catch (err) {
    res.status(500).json({ error: "Помилка видалення" });
  }
};

/* ==================== ПОКУПКИ ==================== */

// ✅ Створити покупку
exports.addPurchase = async (req, res) => {
  try {
    const { card_id, firstName, lastName, phone, asGift } = req.body;
    const card = await ClubCard.findByPk(card_id);
    if (!card) return res.status(404).json({ error: "Картку не знайдено" });

    const purchase = await Purchase.create({ card_id, firstName, lastName, phone, asGift });
    res.status(201).json({ message: "✅ Покупку збережено", purchase });
  } catch (err) {
    console.error("Помилка покупки:", err);
    res.status(500).json({ error: "Не вдалося оформити покупку" });
  }
};

// ✅ Отримати всі покупки
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({ include: ClubCard });
    res.json(purchases);
  } catch (err) {
    console.error("Помилка отримання покупок:", err);
    res.status(500).json({ error: "Не вдалося отримати покупки" });
  }
};

// ✅ Отримати покупку за ID
exports.getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByPk(id, { include: ClubCard });
    if (!purchase) return res.status(404).json({ error: "Покупку не знайдено" });
    res.json(purchase);
  } catch (err) {
    console.error("Помилка отримання покупки:", err);
    res.status(500).json({ error: "Не вдалося отримати покупку" });
  }
};

// ✅ Видалити покупку
exports.deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByPk(id);
    if (!purchase) return res.status(404).json({ error: "Покупку не знайдено" });

    await purchase.destroy();
    res.json({ message: "🗑️ Покупку видалено" });
  } catch (err) {
    console.error("Помилка видалення покупки:", err);
    res.status(500).json({ error: "Не вдалося видалити покупку" });
  }
};
// ✅ Оновити покупку
exports.updatePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, asGift } = req.body;

    const purchase = await Purchase.findByPk(id);
    if (!purchase) {
      return res.status(404).json({ error: "Покупку не знайдено" });
    }

    await purchase.update({ firstName, lastName, phone, asGift });
    res.json({ message: "✅ Покупку оновлено", purchase });
  } catch (err) {
    console.error("Помилка оновлення покупки:", err);
    res.status(500).json({ error: "Не вдалося оновити покупку" });
  }
};