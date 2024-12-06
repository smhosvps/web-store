import { apiSlice } from "../api/apiSlice";

export const disputeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createDelivery: builder.mutation({
            query: (data) => ({
                url: "create-delivery-detail",
                method: "POST",
                body: data,
                credentials: "include" as const
            })
        }),
        getAllDelivery: builder.query({
            query: () => ({
                url: "all-delivery",
                method: "GET",
                credentials: "include" as const
            })
        }),
        deleteDelivery: builder.mutation({
            query: (id) => ({
                url: `delete-delivery/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        }),
        editDelivery: builder.mutation({
            query: ({ id, data}) => ({
                url: `edit-delivery-detail/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const
            })
        }),
    })
})

export const {
useCreateDeliveryMutation,
useDeleteDeliveryMutation,
useEditDeliveryMutation,
useGetAllDeliveryQuery
} = disputeApi;