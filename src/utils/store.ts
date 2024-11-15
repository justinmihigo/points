import { configureStore } from "@reduxjs/toolkit";
import scanResults from "./scan/scanResSlice"
import userInfo from "./user/user"
import { createWrapper } from "next-redux-wrapper";
const store= ()=>{
   return configureStore({
        reducer: {
            scanResults,
            userInfo
        }
    })
}
 
export type AppStore= ReturnType<typeof store>;
export type RootState= ReturnType<AppStore['getState']>
export type AppDispatch= AppStore['dispatch']
export default store;