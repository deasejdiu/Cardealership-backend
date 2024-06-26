
module.exports = (sequelize, DataTypes) => {
    const Offer = sequelize.define(
      "offer",
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
  
    return Offer;
  };