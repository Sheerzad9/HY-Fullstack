import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { setNotificationWithCustomTimeout } from "./notificationReducer";

const blogsSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      // Because createSlice uses immer in the background we can just return, this will set the new state
      return action.payload;
    },
    appendBlogs(state, action) {
      state.push(action.payload);
    },
  },
});

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (data) => {
  return async (dispatch) => {
    const newBlog = await blogsService.createBlog(data);
    dispatch(appendBlogs(newBlog));
  };
};

export const deleteBlog = (blogData) => {
  return async (dispatch) => {
    if (
      window.confirm(
        `Are you sure you wan't to remove blog: '${blogData.title}'`
      )
    ) {
      try {
        await blogsService.deleteBlog(blogData.id);
        dispatch(initBlogs());
        dispatch(
          setNotificationWithCustomTimeout({
            content: {
              type: "success",
              message: `Blog '${blogData.title}' deleted successfully!`,
            },
            customTimeout: 5,
          })
        );
      } catch (e) {
        dispatch(
          setNotificationWithCustomTimeout({
            content: {
              type: "error",
              message: e.response.data.error,
            },
            customTimeout: 5,
          })
        );
      }
    }
  };
};

export const updateBlogLikes = (data) => {
  return async (dispatch) => {
    await blogsService.updateBlogLikes(data);
    dispatch(initBlogs());
    dispatch(
      setNotificationWithCustomTimeout({
        content: {
          type: "success",
          message: "Like's updated successfully!",
        },
        customTimeout: 5,
      })
    );
  };
};

export const { setBlogs, appendBlogs } = blogsSlice.actions;

export default blogsSlice.reducer;
