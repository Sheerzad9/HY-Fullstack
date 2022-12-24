import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    type: null,
    message: null,
  },
  reducers: {
    setNofitication(state, action) {
      // Because createSlice uses immer in the background we can just return, this will set the new state
      return action.payload;
    },
  },
});

export const setNotificationWithCustomTimeout = (data) => {
  return (dispatch) => {
    dispatch(setNofitication(data.content));
    setTimeout(() => {
      dispatch(setNofitication(null));
    }, data.customTimeout * 1000);
  };
};

export const { setNofitication } = notificationSlice.actions;

export default notificationSlice.reducer;
