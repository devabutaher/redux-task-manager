import apiSlice from "@/redux/api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  tagTypes: ["Task"],

  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
    }),

    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
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

    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (result, error, { id }) => [{ type: "Task", id }],

      async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
        // update data optimistically start
        const result = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const existingTaskIndex = draft.findIndex((task) => task.id === id);
            if (existingTaskIndex !== -1) {
              draft[existingTaskIndex] = {
                ...draft[existingTaskIndex],
                ...data,
              };
            }
          })
        );
        // update data optimistically end

        try {
          await queryFulfilled;
        } catch (err) {
          result.undo();
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
} = taskApi;
