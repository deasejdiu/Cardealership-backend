const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.users;
const Role = db.roles;
const nodemailer = require("nodemailer");
const { sequelize } = require("../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { forgotMessage } = require("../utils/emailTemplate");
const Sequelize = require("sequelize");


exports.getAllUsers = (req, res) => {
    User.findAll({})
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  };



  exports.signup = async (req, res) => {
    const { name, email, password, role_id } = req.body;
  
    if (!name || !email || !password || !role_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
  
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, contain at least one number and one uppercase letter",
      });
    }
  
    const userExist = await User.findOne({
      where: { email: req.body.email },
    });
  
    if (userExist) {
      return res.status(400).json({
        message: "User already exist with the given email",
      });
    }
  
    const user = {
      name,
      email,
      password,
      role_id,
    };
  
    User.create(user)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        console.log(`Error creating user: ${err.message}`);
      });
  
    console.log(user);
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
  
    user.token = token;
  };
  
  exports.login = async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
      });
  
      const jwtSecret = process.env.SECRET_KEY ;
  
      if (!req.body.email) {
        res.status(400).json({ message: "Email is required" });
      }
      if(!req.body.password) {
        res.status(400).json({ message: "Password is required" });
      }
  
  
      if (user) {
        const passwordMatch = await user.passwordComparison(req.body.password);
  
        if (passwordMatch) {
          const query = `
            SELECT users.*, roles.name AS role_name
            FROM users
            LEFT JOIN roles ON users.role_id = roles.id
            WHERE users.email = :email;
          `;
  
          const [result] = await sequelize.query(query, {
            replacements: { email: req.body.email },
            type: sequelize.QueryTypes.SELECT,
          });
  
          if (result) {
            const payload = {
              id: result.id,
              role_id: result.role_id,
              role_name: result.role_name,
            };
  
            const token = jwt.sign(payload, jwtSecret, {
              expiresIn: "24h",
            });
  
            req.user = user;
            res.status(200).json({
              message: "ok",
              token,
              role_id: result.role_id,
              role_name: result.role_name,
              name: user.name,
              id: user.id,
            });
          } else {
            console.log("Error fetching user and role information");
          }
        } else {
          console.log("Error");
          res.status(401).json({ message: "Invalid credentials" });
        }
      } else {
        next();
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };


