const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/sequelize");
const cardsRoutes = require("./routes/cardsRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerDocs = require("./swagger"); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Роутинг
app.use("/api", cardsRoutes);
app.use("/api/auth", authRoutes);

// 📘 Swagger документація
swaggerDocs(app); 

// Синхронізація бази
sequelize
  .sync()
  .then(() => console.log(" Таблиці синхронізовано"))
  .catch((err) => console.error(" Помилка sync:", err));

const PORT = 3001;
app.listen(PORT, () =>
  console.log(` Сервер працює на http://localhost:${PORT}`)
);
