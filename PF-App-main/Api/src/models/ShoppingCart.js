const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ShoppingCart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    totalPrice:{
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: "0"
    },
    discountPrice:{
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: "0"
    }
  });
};
