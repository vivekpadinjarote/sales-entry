import { createSlice } from "@reduxjs/toolkit";

const today = new Date().toISOString();
console.log(today);

export const initialState = {
  vr_no: "",
  vr_date: today.split("T")[0],
  ac_name: "",
  ac_amt: 0,
  status: "A",
  resetAt: Date.now(),
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setHeader: (state, action) => {
      return { ...state, ...action.payload };
    },
    setTotalAmount: (state, action) => {
      state.ac_amt = action.payload;
    },
    clearHeader: (state) => {
      state.vr_no = "";
      state.vr_date = today.split("T")[0];
      state.ac_name = "";
      state.ac_amt = 0;
      state.status = "A";
      state.resetAt = Date.now();
    },
  },
});

export const { setHeader, setTotalAmount, clearHeader } = headerSlice.actions;
export default headerSlice.reducer;
