const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Order_Products", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  });
};
