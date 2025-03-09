import foodModel from '../models/foodModel.js'
import userModel from '../models/userModel.js'


//add items to user cart
const addToCart = async (req,res) => {
    
 try {
     let userData = await userModel.findById(req.body.userId)
     //or await userModel.findOne({_id:req.body.userId}) are same
     if (!userData) {
         return res.send(400).json({sucess:false, message:"User Not Found"})
     }
     
     //object 
     let cartData = userData.cartData

     if (!cartData[req.body.itemId]) {
         cartData[req.body.itemId]=1
     }
     else {
         cartData[req.body.itemId] += 1
     }

     //save changes to database 

     // Tell Mongoose that cartData has changed
    //  userData.markModified("cartData");
    //  await userData.save();
    // or u can do this
     await userModel.findByIdAndUpdate(req.body.userId,{cartData})
     
     res.status(200).json({sucess:true,message:"Added To Cart"})

 } catch (error) {
     console.log(error)
     res.status(500).json({sucess:false,message:"Error in Add To Cart"})
 }

}

//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId)
        if (!userData) {
            return res.status(400).json({ sucess: false, message: "User not Found" })
        }

        const cartData = userData.cartData

        //"[if] condition will never be used as minus button will appear when atleast one item is added to cart .but it is frontend anyone can change it so...
        if (!cartData[req.body.itemId] || cartData[req.body.itemId] <=  0) {
            cartData[req.body.itemId] = 0
            return res.status(400).json({sucess:false,message:"No item to Remove"})
        }
        else {
            cartData[req.body.itemId] += -1
        }

        //save in DB
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        
         res.status(200).json({sucess:true,message:"Removed from Cart"})

    } catch (error) {
        console.log(error)
        res.status(500).json({sucess:false, message:"Error in Removing item"})
    }
}

//fetch user cart data
const getCart = async (req, res) => {
    try {
        const { userId } = req.body
    
        const userData = await userModel.findById(userId)
        if (!userData) {
            return res.status(400).json({ sucess:false, message: "User not Found" })
        }
        
        const cartData = userData.cartData
        
        res.status(200).json({success:true,cartData})
        
    } catch (error) {
        console.log(error)
        
        res.status(500).json({success:false,message:"Unable to fetch Cart Items"})
    }

}

export {addToCart,removeFromCart,getCart}