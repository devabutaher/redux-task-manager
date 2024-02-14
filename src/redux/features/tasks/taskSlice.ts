import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  projectQuery: [],
  teamQuery: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    searchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addCheckedProject: (state, action) => {
      state.projectQuery.push(action.payload);
    },
    removeCheckedProject: (state, action) => {
      state.projectQuery = state.projectQuery.filter(
        (projectId) => projectId !== action.payload
      );
    },
    teamQuery: (state, action) => {
      state.teamQuery = action.payload;
    },
  },
});

export const {
  searchQuery,
  teamQuery,
  addCheckedProject,
  removeCheckedProject,
} = taskSlice.actions;
export default taskSlice.reducer;
