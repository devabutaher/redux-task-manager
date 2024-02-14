import apiSlice from "@/redux/api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
    }),

    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              draft.push(response.data);
            })
          );
        } catch (err) {
          console.error(err.error);
        }
      },
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useGetTaskQuery } =
  taskApi;
