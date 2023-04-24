const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      validate: {
        max: 5,
        min: 1,
      },
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewText: {
      type: DataTypes.TEXT,
    },
  });
};
