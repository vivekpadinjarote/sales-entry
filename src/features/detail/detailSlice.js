import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const detailSlice = createSlice({
    name:"detail",
    initialState,
    reducers:{
        addRow:(state,action)=>{
            state.push(action.payload);
        },
        updateRow:(state,action)=>{
            const {index, field, value} = action.payload;
            state[index][field] = value;
        },
        removeRow:(state,action)=>{
            state.splice(action.payload,1)
        },
        setDetail:(state,action)=>{
            return action.payload;
        },
    },
});

export const {addRow, updateRow, removeRow, setDetail } = detailSlice.actions;
export default detailSlice.reducer;