import express from 'express'
import { loginUser, registerUser,forgotPassword, resetPassword, verifyEmail, removeUser, userInfo } from '../controllers/userController.js'


const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/forgot', forgotPassword)
userRouter.post('/reset/:resetToken', resetPassword)
userRouter.post('/verify', verifyEmail)
userRouter.post('/remove', removeUser)
userRouter.post('/info', userInfo)

export default userRouter