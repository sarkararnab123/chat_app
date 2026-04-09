import  jwt from "jsonwebtoken"

const genToken = (userId)=>{
    try {
        const token =jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"2d"})
        return token;
    } catch (error) {
        console.error("gen token error")
        
    }
}

export default genToken