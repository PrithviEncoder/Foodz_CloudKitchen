import express from 'express'
import { getChatCompletion } from "../controllers/chatbotController.js"
import authMiddleware from '../middlewares/auth.js'

const chatbotRouter = express.Router()

chatbotRouter.post('/bot', authMiddleware, getChatCompletion)


export default chatbotRouter