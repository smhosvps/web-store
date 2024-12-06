import { apiSlice } from "../api/apiSlice";

export const liveApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createSchedule: builder.mutation({
            query: ({info, date}) => ({
                url: "create-schedule",
                method: "POST",
                body: {info, date},
                credentials: "include" as const
            })
        }),
        getAllSchedule: builder.query({
            query: () => ({
                url: "get-all-schedule",
                method: "GET",
                credentials: "include" as const
            })
        }),
        updateSchedule: builder.mutation({
            query: ({id, info, date}) => ({
                url: `edit-schedule/${id}`,
                method: "PUT",
                body: {info, date},
                credentials: "include" as const
            })
        }),
        deleteSchedule: builder.mutation({
            query: (id) => ({
                url: `delete-schedule/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        }),
        createLiveFeed: builder.mutation({
            query: ({info, status, videoId}) => ({
                url: "create-live-stream",
                method: "POST",
                body: {info, status, videoId},
                credentials: "include" as const
            })
        }),
        getLiveFeed: builder.query({
            query: () => ({
                url: "latest-live-stream",
                method: "GET",
                credentials: "include" as const
            })
        }),
        updateLiveFeed: builder.mutation({
            query: ({id, info, status, videoId}) => ({
                url: `update-live-stream/${id}`,
                method: "PUT",
                body: {info, status, videoId},
                credentials: "include" as const
            })
        }),
    })
})

export const {
    useCreateScheduleMutation,
    useGetAllScheduleQuery,
    useUpdateScheduleMutation,
    useDeleteScheduleMutation,
    useCreateLiveFeedMutation,
    useGetLiveFeedQuery,
    useUpdateLiveFeedMutation
} = liveApi;