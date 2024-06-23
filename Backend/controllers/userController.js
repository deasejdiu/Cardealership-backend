import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateTokenUser from "../utils/generateTokenUser.js";



//@desc auth user & get token
//@route POST/api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      
  
        generateTokenUser(res, user._id);
        let obj = {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        res.json(obj);
    } else {
      res.status(401).json({ error: true, message: "Invalid email or password" });
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ error: true, message: "User already exists!" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
   
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message:
        "User created successfully. Please check your email to verify your account.",
    });
  } else {
    res.status(400).json({ error: true, message: "Invalid user data!" });
  }
});

// @desc    Get all users
// @route   GET /api/users/all
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.json(users);
  });

//@desc fetches a user
//@route GET/api/users/get/:id
//@access Private
const getUserById = asyncHandler(async (req, res) => {
    let user = await User.findById(req.params.id);
  
    if (user) {
      return res.json(user);
    } else {
      res.status(404).json({ error: true, message: "Resource not found!" });
    }
  });

// @desc    Update user
// @route   PUT /api/users/update/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (typeof req.body.isAdmin !== 'undefined') {
        user.isAdmin = req.body.isAdmin;
      }      

      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ error: true, message: "User not found!" });
    }
  });

// @desc    Delete user
// @route   DELETE /api/users/delete/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      // Delete the user
      await User.deleteOne({ _id: user._id });
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: true, message: "User not found!" });
    }
  });

export { authUser, registerUser, getUsers, getUserById, updateUser, deleteUser }


