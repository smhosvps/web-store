import { apiSlice } from "../api/apiSlice";

export const storeOrderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => ({
                url: "all-product-order",
                method: "GET",
                credentials: "include" as const
            })
        }),
        oderCount: builder.query({
            query: () => ({
                url: "count-product-order",
                method: "GET",
                credentials: "include" as const
            })
        }),
        totalIncome: builder.query({
            query: () => ({
                url: "income-product-order",
                method: "GET",
                credentials: "include" as const
            })
        }),
        totalIncomeTax: builder.query({
            query: () => ({
                url: "tax-from-order",
                method: "GET",
                credentials: "include" as const
            })
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `delete-order/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        }),
        totalOrderChart: builder.query({
            query: () => ({
                url: "get-monthly-store-order-analytics",
                method: "GET",
                credentials: "include" as const
            })
        }),
        updateOrder: builder.mutation({
            query: ({ id, status  }:any) => ({
                url: `edit-delivery-status/${id}`,
                method: "PUT",
                body: { status },
                credentials: "include" as const
            })
        }),
        totalDeliveryStat: builder.query({
            query: () => ({
                url: "total-delivery-fee",
                method: "GET",
                credentials: "include" as const
            })
        }),
        totalRejectedOrderStat: builder.query({
            query: () => ({
                url: "rejected-order",
                method: "GET",
                credentials: "include" as const
            })
        }),
    })
})

export const {
useOderCountQuery,
useTotalIncomeQuery,
useTotalIncomeTaxQuery,
useGetAllOrderQuery,
useDeleteOrderMutation,
useTotalOrderChartQuery,
useUpdateOrderMutation,
useTotalDeliveryStatQuery,
useTotalRejectedOrderStatQuery
} = storeOrderApi;