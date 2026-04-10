import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

const uploadOnCloudinary= async(filepath)=>{
    cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    })
    try {
        if (!filepath || !fs.existsSync(filepath)) {
            throw new Error(`file not found for cloudinary upload: ${filepath}`);
        }

        const uploadResult = await cloudinary.uploader.upload(filepath)
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath)
        }
        return uploadResult.secure_url
    } catch (error) {
        if (filepath && fs.existsSync(filepath)) {
            fs.unlinkSync(filepath)
        }
        console.log("cloudinary upload error:", error.message)
        throw error
    }

}

export default uploadOnCloudinary;
