import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vr_no:"",
    vr_date:"",
    ac_name:"",
    ac_amt:0,
    status:"A",
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
    },
});

export const {setHeader,setTotalAmount} = headerSlice.actions;
export default headerSlice.reducer;