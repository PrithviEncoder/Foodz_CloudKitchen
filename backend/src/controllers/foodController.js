import foodModel from "../models/foodModel.js";
import fs from "fs"

//add food item

const addFood = async (req, res) => {

    
    //it was by mutler alone
    //let image_filename = `${req.file.filename}`


    const image_url = req.file?.path;//set by multer-storage-cloudinary
    //eg req.file.path has ('https://res.cloudinary.com/cloud-prithvi/image/upload/v1758980151/cloudkitchen_assets/adqdvys5hlsu5g4qlfd0.jpg')
    console.log(req.file.path);
    

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        tags: req.body.tags,
        image: image_url
    })

    try {
        await food.save()
        res.status(200).json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

const listFood = async (req, res) => {

    try {
        const foods = await foodModel.find({})
        res.status(200).json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error" })
    }

}

const removeFood = async (req, res) => {

    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error" })
    }

}

const getFoodItem = async (req, res) => {

    try {
        const { itemID } = req.body

        if (!itemID) {
            return res.json({ success: false, message: "itemID is empty" })
        }

        const foodItem = await foodModel.findById(itemID)

        if (!foodItem) {
            return res.json({ success: false, message: "food item not found" })
        }
         
        res.json({success:true,foodItem})
    } catch (error) {
   res.json({success:false,message:"Error in getfooditem api"})
    }
}

const saveFoodItem = async (req, res) => {
    try {
        const foodItem = await foodModel.findByIdAndUpdate(req.body._id, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            tags: req.body.tags,
        })
        
        if (!foodItem) {
            return res.json({success:false,message:"food item not found"})
        }

        res.json({success:true,message:"Item saved"})

    } catch (error) {
        res.json({success:false,message:"Error in saving item to DB"})
    }
}

export { addFood, listFood, removeFood ,getFoodItem, saveFoodItem}