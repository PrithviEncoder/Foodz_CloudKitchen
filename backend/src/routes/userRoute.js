import express from 'express'
import { loginUser, registerUser,forgotPassword, resetPassword, verifyEmail, removeUser, userInfo, resendVerificationCode } from '../controllers/userController.js'
import authMiddleware from '../middlewares/auth.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/forgot', forgotPassword)
userRouter.post('/reset/:resetToken', resetPassword)
userRouter.post('/verify', verifyEmail)
userRouter.post('/remove', removeUser)
userRouter.post('/info', authMiddleware, userInfo)
userRouter.post('/resend-verification', authMiddleware, resendVerificationCode);

export default userRouter