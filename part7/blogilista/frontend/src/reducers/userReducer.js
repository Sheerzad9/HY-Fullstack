import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setNotificationWithCustomTimeout } from "./notificationReducer";
import blogsService from "../services/blogs";

const userSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setUser(state, action) {
      // Because createSlice uses immer in the background we can just return, this will set the new state
      return action.payload;
    },
  },
});

export const initializeUser = () => {
  return async (dispatch) => {
    const existingUser = window.localStorage.getItem("loggedInUser");
    if (existingUser) {
      dispatch(setUser(JSON.parse(existingUser)));
      blogsService.setToken(JSON.parse(existingUser).token);
    }
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(data);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      dispatch(setUser(user));
      blogsService.setToken(user.token);
    } catch (e) {
      dispatch(
        setNotificationWithCustomTimeout({
          content: { type: "error", message: "Wrong username or password!" },
          customTimeout: 10,
        })
      );
    }
  };
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
