import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import projectSlice from "./features/projects/projectSlice";
import taskSlice from "./features/tasks/taskSlice";
import teamSlice from "./features/team/teamSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    projects: projectSlice,
    tasks: taskSlice,
    team: teamSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
