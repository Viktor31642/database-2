const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/sequelize");
const cardsRoutes = require("./routes/cardsRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", cardsRoutes);

// автоматична синхронізація моделей з базою
sequelize
  .sync()
  .then(() => console.log("✅ Таблиці синхронізовано"))
  .catch((err) => console.error("❌ Помилка sync:", err));



const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`🚀 Сервер працює на http://localhost:${PORT}`)
);
