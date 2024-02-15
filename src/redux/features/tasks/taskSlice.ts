import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    searchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { searchQuery } = taskSlice.actions;
export default taskSlice.reducer;
