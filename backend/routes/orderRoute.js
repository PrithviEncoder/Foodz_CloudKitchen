import express from 'express'
import { allOrders, cancelOrder, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js"
import authMiddleware from '../middlewares/auth.js'

const orderRouter = express.Router()

orderRouter.post('/place', authMiddleware, placeOrder)
orderRouter.post('/verify',verifyOrder)
orderRouter.get('/userorders', authMiddleware, userOrders)
orderRouter.get('/allorders', allOrders)
orderRouter.post('/status',updateStatus)
orderRouter.post('/cancel',cancelOrder)

export default orderRouter