import foodModel from "../models/foodModel.js"
import orderModel from "../models/orderModel.js"


//user most freq item based on number of time ordered
const mostFrequentUserItem = async (req, res) => {

    const { userId } = req.body

    try {

        if (!userId) {
            return res.json({ success: false, message: "no user id found" })
        }

        const freqItem = await orderModel.aggregate([
            { $match: { userId } },
            { $unwind: "$items" },
            { $group: { _id: "$items._id", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ])

        //freqItem is an array so
        if (freqItem.length === 0) {
            return res.json({ success: false, message: "No Frequent Item found" })
        }

        //find item
        const item = await foodModel.findById(freqItem[0]._id)

        if (!item) {
            return res.json({ success: false, message: " food Item not found loc:recc.model " })
        }

        //since freqitem  is array with one item so directly provide that object

        res.status(200).json({ success: true, item })
    } catch (error) {
        res.json({ success: false, message: "Error in finding user most freq item" })
    }
}

//most freq order based on all order on website
const mostFrequentItem = async (req, res) => {

    try {
        const mostfreqItem = await orderModel.aggregate([
            { $unwind: "$items" },
            { $group: { _id: "$items._id", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ])

        if (mostfreqItem.length == 0) {
            return res.json({ success: false, message: "no freq item found" })
        }

        //find item
        const item = await foodModel.findById(mostfreqItem[0]._id)

        if (!item) {
            return res.json({ success: false, message: " food Item not found loc:recc.model " })
        }

        res.status(200).json({ success: true, item })

    } catch (error) {
        res.json({ success: false, message: "error in finding most freq item" })
    }

}

//random items from users past orders
const randomItem = async (req, res) => {
    const { userId } = req.body
    try {
        const userItem = await orderModel.find({ userId }, "items._id")

        if (userItem.length == 0) {
            return res.json({ success: false, message: "no user order found" })
        }

        //random order with orderid and items id for optimization
        const order = userItem[Math.floor(Math.random() * userItem.length)]

        //item.items is an array with food item ids/id
        const randomOrder = order.items

        //obj with food id
        const randomItem = randomOrder[Math.floor(Math.random() * randomOrder.length)]

        // find food by id
        const item = await foodModel.findById(randomItem._id)

        res.status(200).json({ success: true, item })

    } catch (error) {
        res.json({ success: false, message: "error in geting random user order" })
    }
}

// get a seasonal items based on month
const seasonalItem = async (req, res) => {
    try {

        let seasonTag = ""

        const month = new Date().getMonth() //jan-0 to dec-11
        if (month >= 2 && month <= 5) seasonTag = "summer"
        else if (month >= 6 && month <= 9) seasonTag = "rainy"
        else seasonTag = "winter"

        const seasonalFoodItem = await foodModel.aggregate([
            { $match: { tags: { $regex: seasonTag, $options: "i" } } },
            { $sample: { size: 1 } }// limit give same item but sample give random one item
        ])

        if (seasonalFoodItem.length === 0) {
            return res.status(404).json({ success: false, message: "no seasonal item found" })
        }

        res.status(200).json({ success: true, item: seasonalFoodItem[0] })

    } catch (error) {
        res.status(500).json({ success: false, message: "error in fetching seasonal item" })
    }
}

//most recently added item
const recentItem = async (req, res) => {
    try {

        const recentFoodItem = await foodModel.findOne()
            .sort({ createdAt: -1 })
            .limit(1)

        //since used findOne it will give obj
        if (!recentFoodItem) {
            return res.status(404).json({success:false,message:"NO Recently added item not found"})
        }
        
        res.status(200).json({ success:true, item:recentFoodItem})

    } catch (error) {
     res.status(500).json({success:false,message:"Error in fetching most recently added item"})
    }
}

export { mostFrequentUserItem, mostFrequentItem, randomItem, seasonalItem, recentItem }