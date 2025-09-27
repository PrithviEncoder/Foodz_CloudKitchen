import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import dotenv from "dotenv";

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cloudkitchen_assets',//create folder auto for the first time
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp','mp3','mp4']
    }
});

export const upload = multer({ storage: storage });