import {v2 as cloudinary} from "cloudinary"
import { config } from "dotenv";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./ApiError.js";
import fs from "fs"

config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localPath) =>{

    if(!localPath) return null;

    try {
        const response = await cloudinary.uploader.upload(localPath,{
            folder: 'chat_app_pics'
        })
        
        fs.unlinkSync(localPath);
        return response;

    } catch (error) {
        fs.unlinkSync(localPath);
        throw new ApiError(400, "cloudinary upload failed")
    }
}

export default uploadOnCloudinary;