import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',

  initialState: {  
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
  },

  reducers: {
      setmessages: (state,action) =>{
        state.messages = action.payload;
      },
      addMessage: (state,action) =>{
        state.messages = [...state.messages,action.payload]
      },
      setusers: (state,action) =>{
        state.users = action.payload;
      },
      setselectedUser: (state,action) =>{
        state.selectedUser = action.payload;
      },
      setisUsersLoading: (state,action) =>{
        state.isUsersLoading = action.payload;
      },
      setisMessagesLoading: (state,action) =>{
        state.isMessagesLoading = action.payload;
      },
  },

});

export const {setmessages,setusers,setselectedUser,setisUsersLoading,setisMessagesLoading,addMessage} = chatSlice.actions;
export default chatSlice.reducer;