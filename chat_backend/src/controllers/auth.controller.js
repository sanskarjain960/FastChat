import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { OAuth2Client } from 'google-auth-library';


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signup = asyncHandler(async (req,res)=>{

    const {fullName,email,password} = req.body;

    if(!fullName || !email || !password) throw new ApiError(400, "all fields are req");
    if(password.length < 6){
        throw new ApiError(401, "password length > 6")
    }

    const user = await User.findOne({email})

    if(user) throw new ApiError(401, "user already exist")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);

    try {
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        generateToken(newUser._id,res);

        return res.status(201).json(
            new ApiResponse(201,{
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilepic,
                createdAt: newUser.createdAt,
            },"user created!!")
        )


    } catch (error) {
        throw new ApiError(500,"server Error");
    }

    

})

export const login = asyncHandler(async (req,res) => {

    const {email,password} = req.body
    
    try {
        const user = await User.findOne({email});

        if(!user) throw new ApiError(400, "Invalid Credentials");

        const result = await bcrypt.compare(password,user.password);

        if(!result) throw new ApiError(400, "Invalid Credentials");

        generateToken(user._id,res);

        const userInfo = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
        }

        return res.status(200).json(new ApiResponse(200,userInfo,"logged in successfully"))

    } catch (error) {
        throw error;
    }
})

export const logout = asyncHandler(async (req, res) => {
  
    try{
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(0),
          })
        res.status(200).json(new ApiResponse(200,null,"logged out successfully"));

    }
    catch(error){
        throw new ApiError(500,"Error in logout controller");
    }
})

export const updateProfile = asyncHandler(async (req, res) => {
  
    try {
        const profile_pic_path = req.file?.path;
        
        const userId = req.user._id;
    
        if(!profile_pic_path) throw new ApiError(400, "Profile pic is required")
            
        const response = await uploadOnCloudinary(profile_pic_path);
    
        const user = await User.findByIdAndUpdate(userId,
            {profilePic : response.url},
            {new: true}
        ).select("-password")
    
        return res.status(200).json(new ApiResponse(200,user,"Profile pic updated successfully"))
    } catch (error) {
        throw new ApiError(400, "error in updating profile pic")
    }
    
})

export const checkAuth = asyncHandler(async (req, res) => {
    
    try {
        res.status(200).json(new ApiResponse(200,req.user, "user authenticated"))
    }
    catch (error) {
        throw new ApiError(405,"Error in check Auth")
    }
}
)

export const googleLogin = asyncHandler(async (req, res) => {

    const { idToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, name } = payload;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ fullName: name, email, password: null ,googleUser: true });
  }

  generateToken(user._id,res);

  const userInfo = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,
    createdAt: user.createdAt,
}

return res.status(200).json(new ApiResponse(200,userInfo,"logged in successfully"))

})

