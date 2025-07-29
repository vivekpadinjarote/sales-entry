import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    item_code: "",
    item_name: "",
    description: "",
    qty: "",
    rate: "",
  },
];

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    addRow: (state, action) => {
      state.push(action.payload);
    },
    updateRow: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    removeRow: (state, action) => {
      state.splice(action.payload, 1);
    },
    setDetail: (state, action) => {
      return action.payload;
    },
    clearDetail: (state) => {
      return initialState;
    },
  },
});

export const { addRow, updateRow, removeRow, setDetail, clearDetail } =
  detailSlice.actions;
export default detailSlice.reducer;
