"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert("club_cards", [
      {
        type: "Adult",
        title: "Premium Gym Card (1 місяць)",
        price: 1200.0,
        benefits: "Тренажерний зал, Сауна, Тренерська підтримка",
      },
      {
        type: "Adult",
        title: "Premium Gym Card (3 місяці)",
        price: 2300.0,
        benefits: "Зал, Сауна, 1 консультація дієтолога",
      },
      {
        type: "Kids",
        title: "Kids Start (3 місяці)",
        price: 550.0,
        benefits: "Групові заняття, Майданчик, Розваги",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("club_cards", null, {});
  },
};
