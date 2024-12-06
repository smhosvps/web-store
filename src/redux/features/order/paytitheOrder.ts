import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: "create-order",
                method: "POST",
                body: data,
                credentials: "include" as const
            })
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: "get-all-admin-order",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getAllOfflineOrders: builder.query({
            query: () => ({
                url: "get-all-offline-tithes",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getAllOrdersArchived: builder.query({
            query: () => ({
                url: "get-all-archived-order",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getAllOrdersBoth: builder.query({
            query: () => ({
                url: "get-all-orders",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getUserByTitheNumber: builder.query({
            query: (ID) => ({
                url: `get-all-offline-orders-tithe-number/${ID}`,
                method: "GET",
                credentials: "include" as const
            })
        }),
        getAllOrdersCount: builder.query({
            query: () => ({
                url: "get-all-orders-count",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getTotalIncome: builder.query({
            query: () => ({
                url: "get-total-income",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getUserOrderForUser: builder.query({
            query: (ID) => ({
                url: `get-all-current-user-order-mobile/${ID}`,
                method: "GET",
                credentials: "include" as const
            })
        }),
        getMonthlyTransactionSummary: builder.query({
            query: ({ year, month }) => `monthly-transaction-summary/${year}/${month}`,
        }),
    })
})

export const {
    useCreateOrderMutation,
    useGetAllOrdersQuery,
    useGetAllOrdersArchivedQuery,
    useGetAllOrdersBothQuery,
    useGetAllOrdersCountQuery,
    useGetTotalIncomeQuery,
    useGetAllOfflineOrdersQuery,
    useGetUserByTitheNumberQuery,
    useGetUserOrderForUserQuery,
    useGetMonthlyTransactionSummaryQuery
} = orderApi;