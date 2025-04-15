import { axiosInstance } from "@/lib/axios"
import {setauthUser, setisCheckingAuth, setisLoggingIn, setisSigningUp, setisUpdatingProfile, setonlineUsers} from "./userSlice"
import { toast } from "sonner"
import { io } from "socket.io-client"
import { store } from "./Store";
import { getSocket,setSocket } from "./userSlice.js";

const BASE_URL = "http://localhost:5000";

export const checkAuth = async(dispatch) =>{
    
    try{
        const res = await axiosInstance.get("/auth/check")
        // const res = await axios.get("http://localhost:5000/api/auth/check")
        dispatch(setauthUser(res.data.data));
        connectSocket()
    }
    catch(error){
        dispatch(setauthUser(null));
        console.log(error.response.data.message);
    }
    finally{
        dispatch(setisCheckingAuth(false));
    }
}

export const signup = async(data,dispatch,navigate) =>{

    dispatch(setisSigningUp(true));

   try {
        const fullName = `${data.firstName} ${data.lastName}`
        const apiData = {fullName: fullName.trim(), email: data.signUpemail, password: data.signUppassword}

        const res = await axiosInstance.post("/auth/signup",apiData);
        dispatch(setauthUser((res.data.data)))
        connectSocket()
        toast.success("Account created successfully");
        
        navigate("/chat")

   } catch (error) {
        toast.error(error.response.data.message)
   } 
   finally{
        dispatch(setisSigningUp(false))
   }
}

export const logout = async(dispatch,navigate) =>{
    try {
        await axiosInstance.post("/auth/logout");
        dispatch(setauthUser(null));
        disconnectSocket()
        toast.success("Logged out successfully")
        
        navigate("/");
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const login = async(data,dispatch,navigate) =>{

    dispatch(setisLoggingIn(true));

    try {
        const res = await axiosInstance.post("/auth/login", data);
        dispatch(setauthUser((res.data.data)))
        connectSocket()
        toast.success("Logged in successfully");
        
        navigate("/chat")
    } catch (error) {
        toast.error(error.response.data.message)
    }
    finally{
        dispatch(setisLoggingIn(false));
    }


}

export const googleLogin = async(idToken,dispatch,navigate) =>{

    dispatch(setisLoggingIn(true));

    try {
        
        const res = await axiosInstance.post('/auth/auth/google', { idToken });
        dispatch(setauthUser((res.data.data)))
        connectSocket()
        toast.success("Logged in successfully");
        
        navigate("/chat")
    } catch (error) {
        toast.error(error.response.data.message)
    }
    finally{
        dispatch(setisLoggingIn(false));
    }


}

export const updateProfilePic = async (Picfile,dispatch) =>{
    dispatch(setisUpdatingProfile(true));
    try {

        if(typeof Picfile === 'string'){
            toast.error("Please upload a profile picture");
            return;
        }

        const formData = new FormData();
        formData.append("profileImg", Picfile); // 'Picfile' is the field name that backend expects

        const res = await axiosInstance.put("/auth/update-profile",formData,{
            headers: {
                "Content-Type": "multipart/form-data",
              },
        });
        
        dispatch(setauthUser(res.data.data));
        toast.success("Profile updated successfully")

    } catch (error) {
        toast.error(error.response.data.message)
    }
    finally{
        dispatch(setisUpdatingProfile(false));
    }
}

export const connectSocket = () =>{

    const dispatch = store.dispatch;

    const {authUser} = store.getState().user;
    const socket = getSocket();

    if(!authUser || socket?.connected) return;

    const Socket = io(BASE_URL,{
        query: {
            userId:authUser._id
        }
    })
    Socket.connect();
    setSocket(Socket)

    Socket.on("getOnlineUsers", (userIds) =>{
        dispatch(setonlineUsers(userIds))
    })
    
}

export const disconnectSocket = () =>{

    const socket = getSocket();
    if(socket?.connected) socket.disconnect();
    setSocket(null);
    
}