const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ShippingAddress", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    street: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.STRING,
    },
    postCode: {
      type: DataTypes.STRING,
    },
    apartment: {
      type: DataTypes.STRING,
    },
    floor: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
  });
};
