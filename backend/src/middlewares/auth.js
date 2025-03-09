import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers
   try {
     if (!token) {
         return res.status(401).json({success:false,message:"Not Authorized Login Again"})
       }
       
       const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
       
       //sending userId to req.body
       req.body.userId = decodeToken.id
       next()

   } catch (error) {
       console.log(error)
       res.status(500).json({success:false,message:"Error in authenticating user"})
   }  
}

export default authMiddleware