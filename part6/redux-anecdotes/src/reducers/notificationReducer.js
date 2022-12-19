import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    type: null,
  },
  reducers: {
    setNotification(state, action) {
      console.log("action.payload: ", action.payload);
      return action.payload;
    },
    clearNotification(state, action) {
      return {
        message: null,
        type: null,
      };
    },
  },
});
export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
