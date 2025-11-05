"use strict";

module.exports = {
  async up(queryInterface) {
    // 1) беремо існуючі id з club_cards
    const [cards] = await queryInterface.sequelize.query(
      "SELECT id FROM club_cards ORDER BY id ASC"
    );

    if (!cards.length) {
      throw new Error(
        "Немає карток у club_cards. Спочатку запусти сид для club_cards."
      );
    }

    // виберемо перші 2 (або скільки є)
    const id1 = cards[0]?.id;
    const id2 = cards[1]?.id ?? cards[0]?.id; // якщо є лише одна картка — посилаємось на неї

    const now = new Date();

    await queryInterface.bulkInsert("purchases", [
      {
        card_id: id1,
        firstName: "Іван",
        lastName: "Коваленко",
        phone: "+380501234567",
        asGift: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        card_id: id2,
        firstName: "Марія",
        lastName: "Гончар",
        phone: "+380671112233",
        asGift: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("purchases", null, {});
  },
};
