module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define(
      "car",
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
  
    return Car;
  };
  