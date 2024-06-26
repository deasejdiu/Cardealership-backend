import express from "express";
import { authUser, deleteUser, getUserById, getUsers, logoutUser, registerUser, updateUser } from "../controllers/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";



const router = new express.Router();

router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/", registerUser);
router.get("/all", protectUser, getUsers);
router.get("/get/:id", protectUser, getUserById);
router.put("/update/:id", protectUser, updateUser);
router.delete("/delete/:id", protectUser, deleteUser);


export default router;