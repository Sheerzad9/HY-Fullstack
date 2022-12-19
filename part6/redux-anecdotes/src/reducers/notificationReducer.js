import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    type: null,
  },
  reducers: {
    handleNotification(state, action) {
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
export const { handleNotification, clearNotification } =
  notificationSlice.actions;

export const setNotification = (notificationData, customTimeoutInSeconds) => {
  return function (dispatch) {
    dispatch(handleNotification(notificationData));
    setTimeout(() => {
      dispatch(clearNotification());
    }, customTimeoutInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
