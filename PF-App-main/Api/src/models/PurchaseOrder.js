const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("PurchaseOrder", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "Created",
        "Processing payment",
        "Preparing for shipping",
        "Sent",
        "Completed",
        "Canceled"
      ),
      defaultValue: "Created",
    },
  });
};
