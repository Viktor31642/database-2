// const express = require("express");
// const router = express.Router();

// const {
//   getAllCards,
//   getCardById,
//   createCard,
//   updateCard,
//   deleteCard,
//   addPurchase,
//   getAllPurchases,
//   getPurchaseById,
//   deletePurchase,
//   updatePurchase,
// } = require("../controllers/cardController");

// // ----- КАРТКИ -----
// router.get("/cards", getAllCards);
// router.get("/cards/:id", getCardById);
// router.post("/cards", createCard);
// router.put("/cards/:id", updateCard);
// router.delete("/cards/:id", deleteCard);

// // ----- ПОКУПКИ -----
// router.post("/purchase", addPurchase);
// router.get("/purchases", getAllPurchases);
// router.get("/purchases/:id", getPurchaseById);
// router.delete("/purchases/:id", deletePurchase);
// router.put("/purchases/:id", updatePurchase);


// module.exports = router;

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

// ----- КАРТКИ -----
router.get("/cards", getAllCards);
router.get("/cards/:id", getCardById);

//  Захищаємо створення, оновлення та видалення
router.post("/cards", requireAuth, requireRole("admin"), createCard);
router.put("/cards/:id", requireAuth, requireRole("admin"), updateCard);
router.delete("/cards/:id", requireAuth, requireRole("admin"), deleteCard);

// ----- ПОКУПКИ -----
router.post("/purchase", requireAuth, addPurchase); // купівля лише для авторизованих
router.get("/purchases", requireAuth, requireRole("admin"), getAllPurchases);
router.get("/purchases/:id", requireAuth, requireRole("admin"), getPurchaseById);
router.delete("/purchases/:id", requireAuth, requireRole("admin"), deletePurchase);
router.put("/purchases/:id", requireAuth, requireRole("admin"), updatePurchase);

module.exports = router;
