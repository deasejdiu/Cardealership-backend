const crypto = require("crypto")
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "users",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        resetPasswordToken: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        resetPasswordExpire: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletetAt: "deleted_at",
        updatedAt: false,
      }
    );
  
    User.beforeCreate(async (user, options) => {
      try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      } catch (error) {
        console.log(`Error in hashing password: ${error.message}`);
        throw error;
      }
    });
  
    User.prototype.passwordComparison = async function (inputPassword) {
      try {
        return await bcrypt.compare(inputPassword, this.password);
      } catch (error) {
        console.log(`Error in password comparison: ${error.message}`);
        throw error;
      }
    };
  
    User.prototype.getResetPasswordToken = function () {
      const resetToken = crypto.randomBytes(20).toString("hex");
      this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      // this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
      this.resetPasswordExpire = Date.now() + 3 * 60 * 60 * 1000;
      return resetToken;
    }
  
    return User;
  };
  