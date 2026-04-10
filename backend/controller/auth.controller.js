import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signUp = async(req,res)=>{
    try {
        const {userName,email,password} = req.body
        const checkuserbyUsername = await User.findOne({userName})
        if(checkuserbyUsername){
            return res.status(400).json({message:"username already exists"})
        }
        const checkuserbyemail = await User.findOne({email})
        if(checkuserbyemail){
            return res.status(400).json({message:"email already exists"})
        }
        const hashpassword = await  bcrypt.hash(password,10)
        const user = await User.create({
            userName,
            email,
            password:hashpassword,
        })

        const token=genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 7*24*60*60*1000,
            sameSite:"none",
            secure:true,
        })

        res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const logIn = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"email does not  exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }

        const token=genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 7*24*60*60*1000,
            sameSite:"none",
            secure:true ,
        })

        res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message:"login error"})
    }
}

export const logOut = async (req,res)=>{
    try {
        res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
});
        return res.status(200).json({message:"logout sucessfully"})
        
    } catch (error) {
        console.error("logout error")
        
    }
}