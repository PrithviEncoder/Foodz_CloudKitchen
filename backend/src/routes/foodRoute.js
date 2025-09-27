import express from "express";
import { addFood, getFoodItem, listFood, removeFood, saveFoodItem } from "../controllers/foodController.js";
import {upload} from "../middlewares/cloudinary.js";
//import multer from "multer";

const foodRouter = express.Router()

//image storage engine

// const storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file, cb) => {
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })

// const upload = multer({ storage: storage })

foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove", removeFood)
foodRouter.post("/get", getFoodItem)
foodRouter.post("/save", saveFoodItem)

export default foodRouter