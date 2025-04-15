import { createSlice } from '@reduxjs/toolkit';

let socket = null;

export const setSocket = (s) => { socket = s };
export const getSocket = () => socket;

const userSlice = createSlice({
  name: 'user',

  initialState: {  
    
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    },

  reducers: {
    setauthUser: (state,action) =>{
      state.authUser = action.payload;
    },

    setisSigningUp: (state,action) =>{
      state.isSigningUp = action.payload;
    },

    setisLoggingIn: (state,action) =>{
      state.isLoggingIn = action.payload;
    },

    setisUpdatingProfile: (state,action) =>{
      state.isUpdatingProfile = action.payload;
    },

    setisCheckingAuth: (state,action) =>{
      state.isCheckingAuth = action.payload;
    },

    setonlineUsers: (state,action) =>{
      state.onlineUsers = action.payload;
    },
    
  },
});

export const {setauthUser, setisCheckingAuth, setisSigningUp, setisLoggingIn,setisUpdatingProfile,setonlineUsers } = userSlice.actions;
export default userSlice.reducer;