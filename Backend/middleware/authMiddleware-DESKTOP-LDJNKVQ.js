import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';


// User must be authenticated
const protectUser = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');

      console.log(decoded.userId, 'decoded userid')
      console.log(req.user, 'requser')

      next();
    } catch (error) {
      console.error(error);
      res.status(404).json({error: true, message: 'Not authorized, token failed!'});
      // throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(404).json({error: true, message: 'Not authorized, no token!'});
    // throw new Error('Not authorized, no token');
  }
});




export { protectUser };