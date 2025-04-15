import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },
        
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        profilePic:{
            type: String,
            default: "",
        },
        googleUser: { 
            type: Boolean, 
            default: false 
        },
    },
    {timestamps: true}
)

const User = mongoose.model("User",userSchema);
export default User;