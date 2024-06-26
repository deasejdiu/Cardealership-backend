
module.exports = (sequelize, DataTypes) => {
    const ContactUs = sequelize.define(
      "contactus",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        timestamps: false,
      }
    );
  
    return ContactUs;
  };
  