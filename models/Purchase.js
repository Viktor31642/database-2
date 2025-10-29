const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const ClubCard = require("./ClubCard");

const Purchase = sequelize.define(
  "Purchase",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    card_id: { type: DataTypes.INTEGER, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    asGift: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "purchases",
    timestamps: true,
  }
);

// зв’язок: покупка належить картці
Purchase.belongsTo(ClubCard, { foreignKey: "card_id" });

module.exports = Purchase;
