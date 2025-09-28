import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import { config } from "dotenv";
import Stripe from "stripe"
config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user order form frotnend
const placeOrder = async (req, res) => {
    const frontend_url = `${process.env.CLIENT_URL}`;
    console.log("stripe client url", frontend_url);
    //dont know calling process.env.CLIENT_URL with out ``cauing problem even in below log
    //console.log("without stirng", process.env.CLIENT_URL);
    
    try {
        //add order details in DB
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            discount: req.body.discount
        })
        await newOrder.save()

        //details save in database we need to clear usercart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        //PAYMENT
        const line_items = req.body.items.map(item => ({
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
        if (req.body.discount > 0) {

            const coupon = await stripe.coupons.create({
                amount_off: req.body.discount * 100,
                currency: 'inr'
            });

            discounts = [{ coupon: coupon.id }];
        }


        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            discounts,
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.status(200).json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error in place order" })
    }

}

//verification of payment
const verifyOrder = async (req, res) => {

    const { success, orderId } = req.body

    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.status(200).json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error in verify order" })
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