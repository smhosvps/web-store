import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrderNotification: builder.query({
            query: () => ({
                url: "get-notication",
                method: "GET",
                credentials: "include" as const
            })
        }),
        editRead: builder.mutation({
            query: ({ id, status }) => ({
                url: `update-notication/${id}`,
                method: "PUT",
                body: status,
                credentials: "include" as const
            })
        }),
        deleteNotificationPlus: builder.mutation({ 
            query: (id) => ({
                url: `notifications/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        })
    })
})

export const {
    useEditReadMutation,
    useGetOrderNotificationQuery,
    useDeleteNotificationPlusMutation
} = notificationApi;