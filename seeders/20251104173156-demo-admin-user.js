"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = require("bcryptjs");
    const hash = await bcrypt.hash("admin123", 10);

    // ← використовуємо назви колонок як у БД: created_at (НЕ createdAt)
    await queryInterface.bulkInsert("users", [
      {
        name: "Admin",
        email: "admin@example.com",
        password: hash,
        role: "admin",
        created_at: new Date() // можна й не вказувати, бо є DEFAULT CURRENT_TIMESTAMP
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", { email: "admin@example.com" });
  }
};
