const jwt = require("jsonwebtoken");
const db = require("../models");
const Users = db.users;
// const {sequelize} = require("../models")

verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new Error("Authorization header not provided");
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // if(decoded.exp)
    // req.user = await User.findById(decoded._id);
    const user = await Users.findByPk(decoded.id);
    // console.log("User found:", user);
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized - Token expired' });
    }
    return next(err);
  }
};