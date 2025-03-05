import razorpay from 'razorpay';
import Stripe from 'stripe';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
//payment gatway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
//globel variable 
const currency = 'inr';
const delivery_charges = 10;
//placing order using COD
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({
            success: true,
            message: "Order Placed"

        })
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            message: err.message

        })
    }
}

//placing order using stripe
const placeOrderStripe = async (req, res) => {
    // try {
    //     const { userId, items, amount, address } = req.body;
    //     const { origin } = req.headrs;
    //     const orderData = {
    //         userId,
    //         items,
    //         address,
    //         amount,
    //         paymentMethod: "Stripe",
    //         payment: false,
    //         date: Date.now()
    //     }
    //     const newOrder = new orderModel(orderData);
    //     await newOrder.save()

    //     const line_items = items.map((item) => ({
    //         price_data: {
    //             currency: currency,
    //             product_data: {
    //                 name: item.name,

    //             },
    //             unit_amount: item * price * 100
    //         },
    //         quentity: item.Quentity
    //     }))
    //     line_items.push({
    //         price_data: {
    //             currency: currency,
    //             product_data: {
    //                 name: 'Dlivery_charges',

    //             },
    //             unit_amount: delivery_charges * 100
    //         },
    //         quentity: 1
    //     })
    //     const session = await stripe.checkout.sessions.create({
    //         success_url: `${origin}/verify?succcess=true&orderId =${newOrder._id}`,
    //         cancel_url: `${origin}/verify?succcess=false&orderId =${newOrder._id}`,
    //         line_items,
    //         mode: payment,
    //     })
    //     res.json({
    //         success: true,
    //         session_url: session.url
    //     })
    // } catch (err) {
    //     console.log(err)
    //     res.json({
    //         success: false,
    //         message: err.message

    //     })
    // }

}
//verify stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;
    // try {
    //     if (success === 'true') {
    //         orderModel.findByIdAndUpdate(orderId, { payment: 'true' });
    //         await userModel.findByIdAndUpdate(userId, { cartData: {} });
    //         res.json({
    //             success: true,

    //         })
    //     } else {
    //         await orderModel.findByIdAndDelete(orderId);
    //         res.json({
    //             success: false
    //         })
    //     }

    // } catch (err) {
    //     console.log(err)
    //     res.json({
    //         success: false,
    //         message: err.message

    //     })
    // }
}




//placing order using razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Save order details in the database
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false, // Payment status is initially false
            date: Date.now(),
        };
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Create Razorpay order
        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(), // Use order ID as receipt
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({
                    success: false,
                    message: "Failed to create Razorpay order",
                });
            } else {
                res.json({
                    success: true,
                    order,
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: err.message,
        });
    }
};
//verify razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        // Fetch order details from Razorpay
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log("Razorpay Order Info:", orderInfo);

        // Verify payment status
        if (orderInfo.status === 'paid') {
            // Update payment status in the database
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} }); // Clear user's cart
            res.json({
                success: true,
                message: "Payment Successful",
            });
        } else {
            res.json({
                success: false,
                message: "Payment Failed",
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: err.message,
        });
    }
};


// all user data for admin pannel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})

        res.json({
            success: true,
            orders
        })
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            message: err.message

        })
    }
}

//User Data for front End 

const userOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("user Id from order controller ", req.body)
        const orders = await orderModel.find({ userId });
        res.json({
            success: true,
            orders
        })
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            message: err.message

        })
    }
}

//update order status only admin can update  order status 
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        console.log(status)
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({
            success: true,
            message: "Status Updated"
        })

    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            message: err.message

        })
    }
}

export { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrder, verifyRazorpay, verifyStripe };

