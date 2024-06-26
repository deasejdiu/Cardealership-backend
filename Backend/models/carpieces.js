
module.exports = (sequelize, DataTypes) => {
    const CarPieces = sequelize.define(
      "carpieces",
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
  
    return CarPieces;
  };
  