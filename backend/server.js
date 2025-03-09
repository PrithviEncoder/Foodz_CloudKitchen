import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
// import 'dotenv/config'
import userRouter from "./routes/userRoute.js"
import {config} from "dotenv"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import couponRouter from "./routes/couponRoute.js"


//loading env 
config()

//app config 
const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(express.json());//to handle json data
app.use(express.urlencoded({ extended: true }));//to handle formdata
app.use(cors());

//database connection
connectDB()

//api endpoint middleware
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/coupon",couponRouter)

app.get("/", (req,res) => {
     res.send("app is working fine ")
})

app.listen(port, () => {
    console.log(`Server is working at port ${port}`)
})