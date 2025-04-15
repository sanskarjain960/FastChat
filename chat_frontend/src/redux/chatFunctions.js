import { setisMessagesLoading, setisUsersLoading, setmessages, setusers,addMessage } from "./chatSlice";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { store } from "./Store";
import { getSocket } from "./userSlice";


export const getUsers = async() =>{

  const dispatch = store.dispatch;

  dispatch(setisUsersLoading(true));
    
    try{
        const res = await axiosInstance.get("/messages/users")
        
        dispatch(setusers(res.data.data));
    }
    catch(error){
        dispatch(setusers(null));
        toast.error(error.response.data.message, error);
    }
    finally{
      dispatch(setisUsersLoading(false));
    }
}

export const getMessages = async(userId) =>{

  const dispatch = store.dispatch;

  dispatch(setisMessagesLoading(true));
    
    try{
        const res = await axiosInstance.get(`/messages/${userId}`)
        dispatch(setmessages(res.data.data));
    }
    catch(error){
        // dispatch(setmessages(null));
        toast.error(error.response.data.message, error);
    }
    finally{
      dispatch(setisMessagesLoading(false));
    }
}

export const sendMessage = async(messageData) =>{

  const dispatch = store.dispatch;
  const state = store.getState();
  const messages = state.chat.messages;
  const selectedUser = state.chat.selectedUser;
    
    try{
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
        dispatch(setmessages([...messages,res.data.data]));
    }
    catch(error){
      toast.error(error.response.data.message, error);
    }
    
}

export const subscribeToMessages = ()=>{
  const dispatch = store.dispatch;
    const {selectedUser} = store.getState().chat;

    if(!selectedUser) return;
    const socket = getSocket();

    socket.on("newMessage",(newMessage) =>{

      if(newMessage.senderId !== selectedUser._id) return;

      dispatch(addMessage(newMessage))
    })
}

export const unsubscribeFromMessages = () => {

  const socket = getSocket();
  socket.off("newMessage");
}