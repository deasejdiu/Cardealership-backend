
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
      "order",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        timestamps: false,
      }
    );
  
    return Order;
  };