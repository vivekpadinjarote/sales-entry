import { createSlice } from "@reduxjs/toolkit";

const today = new Date().toISOString()
console.log(today)

export const initialState = {
    vr_no:parseInt(""),
    vr_date:today.split("T")[0],
    ac_name:"",
    ac_amt:0,
    status:"A",
    resetAt: Date.now(),
};

const headerSlice = createSlice({
    name:"header",
    initialState,
    reducers:{
        setHeader:(state,action)=>{
            return {...state,...action.payload};
        },
        setTotalAmount:(state,action)=>{
            state.ac_amt = action.payload;
        },
        clearHeader:(state)=>{
            return {...initialState, resetAt:Date.now()}
        }
    },
});

export const {setHeader,setTotalAmount,clearHeader} = headerSlice.actions;
export default headerSlice.reducer;