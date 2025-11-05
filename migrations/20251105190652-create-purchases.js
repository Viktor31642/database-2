"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("purchases", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      card_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "club_cards", // назва таблиці, на яку є зв’язок
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "ID картки, яку купив користувач",
      },
      firstName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Ім’я покупця",
      },
      lastName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Прізвище покупця",
      },
      phone: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Телефон покупця",
      },
      asGift: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Чи куплено як подарунок",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("purchases");
  },
};
