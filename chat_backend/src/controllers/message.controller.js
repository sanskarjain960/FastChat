import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getReceiverSocketId,io } from "../lib/socket.js";

export const getUsersForSidebar = asyncHandler(async (req, res) => {
  
        try {
            const loggedInUserId = req.user._id;
            const filterdUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
            res.status(200).json(new ApiResponse(200,filterdUsers,"users fetched"));
        } catch (error) {
            throw new ApiError(400, error.message);
        }
})

export const getMessages = asyncHandler(async (req, res) => {
    
  
    try {
        const {id: userToChatId} = req.params
        const myId = req.user._id;
    
        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ],
        });
    
        return res.status(200).json(new ApiResponse(200,messages,"chats received"));
    } catch (error) {
        throw new ApiError(400, "error in fetching messages");
    }

})

export const sendMessage = asyncHandler(async (req, res) => {
    
    try {
        const {text} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
    
        const localImgpath = req.file?.path;
        let imgUrl = "";
    
        if(localImgpath){
            const res = await uploadOnCloudinary(localImgpath);
            imgUrl = res.url;
        }
    
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imgUrl,
        })
    
        await newMessage.save();
    
        // REALTIME FUCNTIONALITY

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
    
        res.status(200).json(new ApiResponse(200,newMessage));
    } catch (error) {
        throw new ApiError(400, "Internal Server Error")
    }
})