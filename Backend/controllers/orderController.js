import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";


// @desc    Get all orders
// @route   GET /api/orders/all
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  });


// @desc    Get orders by client ID
// @route   GET /api/orders/client/:clientId
// @access  Private/Admin
const getOrdersByClientId = asyncHandler(async (req, res) => {
    const { clientId } = req.params;
    
    const orders = await Order.find({ clientId });
  
    if (orders) {
      res.json(orders);
    } else {
      res.status(404).json({ error: true, message: 'Orders not found' });
    }
  });

//@desc add a new order
//@route POST/api/orders/add
//@access Private Admin
  const addOrder = asyncHandler(async (req, res) => {
    const { clientName, chosenCar, price, clientId } = req.body;
  
    const newOrder = {
      clientName: clientName,
      clientId: clientId,
      chosenCar: chosenCar,
      price: price
    };
  
  
    const order = new Order(newOrder);
    const createdOrder = await order.save();
  
    res.status(201).json(createdOrder);
  });

//@desc fetches an order
//@route GET/api/orders/get/:id
//@access Public
const getOrderById = asyncHandler( async (req, res) => {
  const order = await Order.findById(req.params.id)

  if(order){
      return res.json(order)
  } else {
  res.status(404).json({error: true, message: 'Resource not found!'});
}
}) 

  // @desc    Update order
// @route   PUT /api/orders/update/:id
// @access  Private/Admin
const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
  
    if (order) {
      if (typeof req.body.delivered !== 'undefined') {
        order.delivered = req.body.delivered;
      }      

      const updatedOrder = await order.save();
  
      res.json({
        _id: updatedOrder._id,
        delivered: updatedOrder.delivered,
      });
    } else {
      res.status(404).json({ error: true, message: "Order not found!" });
    }
  });

  // @desc    Delete an order
  // @route   DELETE /api/orders/delete/:id
  // @access  Private/Admin
  const deleteOrder = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);
  
    if (order) {
      
      await order.deleteOne({_id : order._id})
      
  
      res.status(200).json({message: 'Order deleted'})
    } else {
      res.status(404).json({error: true, message: 'Order not found!'});
    }
  });
  


export { getOrders, getOrdersByClientId, addOrder, getOrderById, updateOrder, deleteOrder }