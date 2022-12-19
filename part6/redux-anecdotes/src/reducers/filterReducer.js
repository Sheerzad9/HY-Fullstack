import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
  name: "filter",
  initialState: null,
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
    clearFilter(state, action) {
      return null;
    },
  },
});

export const { setFilter, clearFilter } = filterReducer.actions;
export default filterReducer.reducer;
