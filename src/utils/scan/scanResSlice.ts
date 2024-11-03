import { createSlice } from "@reduxjs/toolkit";

const scanResults= createSlice(
    {
        name: "scanResults",
        initialState: {
            results: "",
        },
        reducers: {
            addResult: (state, action) => {
                state.results= action.payload;
            },
        },
    }
)

export const { addResult } = scanResults.actions;
export default scanResults.reducer;