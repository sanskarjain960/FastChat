import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protectRoute = asyncHandler(async (req, res,next) => {
        
    const token = req.cookies?.jwt;

        console.log(token);
    
        if(!token){
            throw new ApiError(400,"Unauthorized - no token provided");
        } 
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
        if(!decoded) throw new ApiError(401,"Unauthorized - no token provided");
    
        const user = await User.findById(decoded.userId).select("-password");
    
        if(!user) throw new ApiError(401, "user not found");
    
        req.user = user;

        next()
    
    
})