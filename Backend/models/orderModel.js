import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },
    clientId: {
        type: String,
        required: true,
    },
    chosenCar: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    delivered: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})



const Order = mongoose.model("Order", orderSchema)

export default Order