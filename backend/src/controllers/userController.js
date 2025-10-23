import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt, { genSalt } from "bcrypt"
import validator from "validator"
import crypto from 'crypto'
import { sendPasswordResetMail, sendPasswordResetSuccessMail, sendVerificationMail } from "../mail/mail.methods.js";
import 'dotenv/config'


//token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
    //{id:id} that is why when verify in auth middleware we use id 
}

//login user
const loginUser = async (req, res) => {

    const { email, password } = req.body
    const arr = [email, password]

    try {
        //missing feild check
        const missingfeild = arr.some(feild => feild?.trim() === "")

        if (missingfeild) {
            return res.status(400).json({ success: false, message: "All credentials required" })
        }

        //check for user existence
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "User don't exists please register" })
        }

        //password comparision
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "Password is incorrect" })
        }

        //token
        const token = createToken(user._id)

        return res.status(200).json({ success: true, token, user })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Error in login" })
    }

}

//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const arr = [name, email, password]

        //missing feilds validation
        const missingFeilds = arr.some(feild => feild?.trim() === "")
        if (missingFeilds) {
            return res.status(400).json({ success: false, message: "All credentials required" })
        }

        //checking is user alreasdy exists
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(400).json({ success: false, message: "User already Exists" })
        }

        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

        const newUser = await new userModel({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            verificationToken,
            verificationExpiry: Date.now() + (15 * 60 * 1000)
        })
        const createdUser = await newUser.save()

        const user = await userModel.findById(createdUser._id).select("-password")

        if (!user) {
           return res.json({success:false,message:"User  not created"})
        }

        //generate token
        const token = createToken(createdUser._id)

        //verify mail
        await sendVerificationMail(createdUser.email, verificationToken)

        return res.status(200).json({ success: true, token, user })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }


}

//verify email
const verifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await userModel.findOne({
            verificationToken: code,
            verificationExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return res.json({ success: false, message: "OTP is Wrong or Expired" })
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationExpiry = undefined
        await user.save()

        const userResponse = await userModel.findById(user._id).select("-password")

        const token = createToken(user._id);

        res.status(200).json({ success: true, user:userResponse, token , message: "user verified successfully" })

        
    } catch (error) {
        res.json({ success: false, message: "Error in user verification" })
    }
}

//forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ message: "Email not provided", success: false })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Any user with this email is not registered" });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 1 * 15 * 60 * 1000;//15 min

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiry = resetTokenExpiry;
        await user.save();

        if (!(process.env.CLIENT_URL)) {
            return res.status(500).json({ success: false, message: "Error in fetching var from dotenv" })
        }
        await sendPasswordResetMail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ user, success: true, message: "Forgot password is Successful check MailBox" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error in forgot password" })
    }
}

//reset password
const resetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const { password, confirmPassword } = req.body;

    try {
        if (password === "" || confirmPassword === "") {
            return res.status(400).json({ success: false, message: "Empty input" })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "password and confirm password do not match" })
        }
        if (!resetToken) {
            return res.status(500).json({ success: false, message: "token not fetch from params" })
        }

        const user = await userModel.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpiry: { $gt: Date.now() }
        });//if after15 min link is click then user will not we there

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found for reset password", alreadyResetOrExpired: true });
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        await sendPasswordResetSuccessMail(user.email);


        return res.status(200).json({ success: true, message: "Password reset Successfull" })

    } catch (error) {
        res.status(500).json({ success: false, message: "Error in reset message" })
    }

}

const removeUser = async (req, res) => {
    const { email } = req.body

    try {
        const user = await userModel.findOne({ email });
    
        if (!user) {
            return res.json({ success: false, message: "User  not found" })
        }
    
        await userModel.findByIdAndDelete(user._id)
    
        res.json({ success: true, message: "User successfully deleted" })
    } catch (error) {
        res.json({ success: false, message: "Error in deleting user" })
    }

}

const userInfo = async (req, res) => {
    const { userId } = req.body
    
    try {
        const user = await userModel.findById(userId).select("-password -__v -_id -resetPasswordToken -resetPasswordExpiry -verificatioinToken -verificatioinExpiry");

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

       return res.json({success:true,user})

    } catch (error) {
       return res.json({ success: false, message: "Error in getting user info" })
    }
}

const resendVerificationCode = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        const newVerificationExpiry = Date.now() + (1 * 15 * 60 * 1000);//15 min from now.

        user.isVerified = false;
        user.verificationToken = newVerificationCode;
        user.verificationExpiry = newVerificationExpiry;
        await user.save();

        await sendVerificationMail(user.email, newVerificationCode);

        return res.json({ success: true, message: "Successfully Resend OTP." });

    } catch (error) {
        return res.json({ success: false, message: "Error in resending verification code" });
    }
}


export { loginUser, registerUser, forgotPassword, resetPassword, verifyEmail, removeUser, userInfo, resendVerificationCode }