import express from 'express'
import { allOrders, cancelOrder, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js"
import authMiddleware from '../middlewares/auth.js'
import { mostFrequentItem, mostFrequentUserItem, randomItem, recentItem, seasonalItem } from '../controllers/recommendationController.js'

const orderRouter = express.Router()

//order controlls routes
orderRouter.post('/place', authMiddleware, placeOrder)
orderRouter.post('/verify',verifyOrder)
orderRouter.get('/userorders', authMiddleware, userOrders)
orderRouter.get('/allorders', allOrders)
orderRouter.post('/status',updateStatus)
orderRouter.post('/cancel', cancelOrder)

// recommandation controllers routes 
//both under /api/order
orderRouter.post('/user-frequent-order',authMiddleware, mostFrequentUserItem)
orderRouter.get('/frequent-order', mostFrequentItem)
orderRouter.post('/random-user-order-item', authMiddleware, randomItem)
orderRouter.get('/seasonal-item',seasonalItem)
orderRouter.get('/recent-item',recentItem)

export default orderRouter