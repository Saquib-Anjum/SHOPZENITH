import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {  // Changed from "Items" to "items"
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Order Placed"
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date, // Changed from Number to Date
        default: Date.now
    }
});

const orderModel = mongoose.models.Order || mongoose.model('order', orderSchema);

export default orderModel;
