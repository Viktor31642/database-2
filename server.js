const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/sequelize");
const cardsRoutes = require("./routes/cardsRoutes");
const { swaggerUi } = require('./swagger');
const swaggerFile = require('./swagger-output.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", cardsRoutes);

// автоматична синхронізація моделей з базою
sequelize
  .sync()
  .then(() => console.log(" Таблиці синхронізовано"))
  .catch((err) => console.error(" Помилка sync:", err));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const PORT = 3001;
app.listen(PORT, () =>
  console.log(` Сервер працює на http://localhost:${PORT}`)
);
