import express from 'express';
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrder,verifyStripe ,verifyRazorpay} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
 const orderRouter = express.Router();

 //these routes are for only admin
 orderRouter.post('/list',adminAuth,allOrders);
 orderRouter.post('/status',adminAuth,updateStatus);
//these route for user && payment cod
 orderRouter.post('/place',authUser,placeOrder);
 orderRouter.post('/stripe',authUser,placeOrderStripe);

 orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

 //User Features 

 orderRouter.post('/userorders' , authUser,userOrder)
//verify payment
 orderRouter.post('/verifyStripe' , authUser,verifyStripe)
 orderRouter.post('/verifyRazorpay' , authUser,verifyRazorpay)

 export default orderRouter;



 