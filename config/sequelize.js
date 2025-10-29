const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("prime_life_club", "root", "usbw", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Підключено до MySQL через Sequelize"))
  .catch((err) => console.error("Помилка підключення:", err));

module.exports = sequelize;