import { createSlice } from "@reduxjs/toolkit";

const userInfo= createSlice({
    name: "userInfo",
    initialState: {
        user: {
            name: "",
            phone:"",
            gender:"",
            points: 0,
            hasScanned: false,
            isActive: false,
            type:"inActive"
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.user= action.payload;
        },
    },
})


export const {setUser}= userInfo.actions;
export default userInfo.reducer;