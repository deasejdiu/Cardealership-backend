import express from "express";
import { protectUser } from "../middleware/authMiddleware.js";
import { addOrder, deleteOrder, getOrderById, getOrders, getOrdersByClientId, updateOrder } from "../controllers/orderController.js";


const router = new express.Router();

router.get("/all", getOrders);
router.get("/client/:clientId", getOrdersByClientId);
router.get("/get/:id", getOrderById);
router.post("/add", protectUser, addOrder);
router.put("/edit/:id", protectUser, updateOrder);
router.delete("/delete/:id", protectUser, deleteOrder);


export default router;
