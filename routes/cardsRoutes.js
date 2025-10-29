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

// ----- КАРТКИ -----
router.get("/cards", getAllCards);
router.get("/cards/:id", getCardById);
router.post("/cards", createCard);
router.put("/cards/:id", updateCard);
router.delete("/cards/:id", deleteCard);

// ----- ПОКУПКИ -----
router.post("/purchase", addPurchase);
router.get("/purchases", getAllPurchases);
router.get("/purchases/:id", getPurchaseById);
router.delete("/purchases/:id", deletePurchase);
router.put("/purchases/:id", updatePurchase);


module.exports = router;

