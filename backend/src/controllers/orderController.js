import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import pendingOrderModel from "../models/pendingOrderModel.js";
import { config } from "dotenv";
import Stripe from "stripe";
import crypto from "crypto";
config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user order form frotnend
const placeOrder = async (req, res) => {
    const { userId, address, items, amount, discount } = req.body;
    const frontend_url = `${process.env.CLIENT_URL}`;
    console.log("stripe client url", frontend_url);
    //dont know calling process.env.CLIENT_URL with out ``cauing problem even in below log
    //console.log("without stirng", process.env.CLIENT_URL);
    
    try {
        //check user existence
        const user = await userModel.findById(userId)   
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        //remove old pending order of user if exists
        //cause we are creating order below so if already old pending order exists then it will create confusion
        const userOldPendingOrder = await pendingOrderModel.deleteMany({ userId });
        console.log("deleted old pending orders:", userOldPendingOrder.deletedCount);

        const securityKey = crypto.randomBytes(16).toString("hex");
        //console.log("security key:", securityKey);

        //add pending order in pending order collection
        const pendingOrder = new pendingOrderModel({
            userId,
            items,
            address,
            securityKey
        })
        await pendingOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        //PAYMENT
        const line_items = items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }))

        //after all item object pushed in arr then add ONE DELIVERY CHARGE info
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 40 * 100
            },
            quantity: 1
        })

        // discount
        let discounts = [];
        if (discount > 0) {

            const coupon = await stripe.coupons.create({
                amount_off:discount * 100,
                currency: 'inr'
            });

            discounts = [{ coupon: coupon.id }];
        }


        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            discounts,
            success_url: `${frontend_url}/verify?session_id={CHECKOUT_SESSION_ID}&success=true`,
            cancel_url: `${frontend_url}/verify?success=false`,
            metadata: {
                userId,
                amount,
                discount,
                securityKey
            }
        })

       return res.status(200).json({ success: true, session_url: session.url })

    } catch (error) {
        //always use error.message to see actual error
        //Also u will see this in vscode terminal not browser since it is nodejs backend error
        console.error("error in place order:", error.message);
        return res.status(500).json({ success: false, message: "Error in place order backend" })
    }

}

//verification of payment
const verifyOrder = async (req, res) => {

    const { success, session_id } = req.body;
    try {
        //needed as when u cancel order from stripe payment page then session_id will not be there in url
        if (!session_id) {
            //on removing status 400 now it will not be an error just a failed response
            return res.json({ success: false, message: "session_id is missing" });
        }

        const session = await stripe.checkout.sessions.retrieve(session_id);

        const { userId, amount, discount, securityKey } = session.metadata;

         //there can be either one or none pending order for a user. cause system is designed that way
        const pendingOrder = await pendingOrderModel.findOne({ userId, securityKey });
        //above do not use findById cause pending order id is different from user id
        if (!pendingOrder) {
            return res.status(400).json({ success: false, message: "No pending order found for user" });
        }
        const { items, address } = pendingOrder;

        if (session.payment_status !== "paid" || success === "false") {
            return  res.status(400).json({ success: false, message: "Payment not successful" })
        }

        if ( session.payment_status === "paid" && (success === "true" || success === true) ) {
            
         //add order details in DB
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            discount,
            payment: true
        })
        await newOrder.save()

        }
       
        return res.status(200).json({ success: true, message: "Order placed successfully" })
                
    } catch (error) {
        console.log("error in verify order:", error.message);
       return res.status(500).json({ success: false, message: "Error in verify order" })
    }


}

// user orders for myorderes page in frontend
const userOrders = async (req, res) => {
    try {
        //using find not findOne so it will give all orders of a user
        const orders = await orderModel.find({ userId: req.body.userId })

        res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error in displaying order" })
    }
}

//Listing all order for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.status(200).json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error in fetching allorders" })
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })

        res.status(200).json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error in updating status" })
    }
}

const cancelOrder = async (req, res) => {
    try {
        
        await orderModel.findByIdAndDelete(req.body.orderId)
        
        res.json({success:true,message:"Order removed successfully"})

    } catch (error) {
        res.json({success:false,message:"Error in removing order"})
    }
} 

export { placeOrder, verifyOrder, userOrders, allOrders, updateStatus, cancelOrder }