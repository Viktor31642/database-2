const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ClubCard = sequelize.define(
  "ClubCard",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    benefits: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "club_cards",
    timestamps: false,
  }
);

module.exports = ClubCard;
