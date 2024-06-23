import express from "express";
import { protectUser } from "../middleware/authMiddleware.js";
import { addContact, getContactById, getContacts } from "../controllers/contactController.js";


const router = new express.Router();

router.get("/all", protectUser, getContacts);
router.get("/get/:id", protectUser, getContactById);
router.post("/add", addContact);


export default router;