"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("club_cards", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "Тип картки (Adult / Kids)",
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Назва картки",
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "Ціна картки",
      },
      benefits: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Опис переваг картки",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("club_cards");
  },
};
