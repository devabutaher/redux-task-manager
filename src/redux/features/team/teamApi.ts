import apiSlice from "@/redux/api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => "/team",
    }),
  }),
});

export const { useGetTeamsQuery } = teamApi;
