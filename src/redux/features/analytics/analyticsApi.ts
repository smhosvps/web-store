import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getIncomeAnalytics: builder.query({
            query: () => ({
                url: "get-monthly-analytics",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getUsersAnalytics: builder.query({
            query: () => ({
                url: "get-user-analytics",
                method: "GET",
                credentials: "include" as const
            })
        }), 
       
        getOrdersAnalytics: builder.query({
            query: () => ({
                url: "get-order-analytics",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getOfferingAnalytics: builder.query({
            query: () => ({
                url: "get-monthly-offering-analytics",
                method: "GET",
                credentials: "include" as const
            })
        }), 
        getAnanimousAnalytics: builder.query({
            query: () => ({
                url: "get-monthly-ananimous-give-analytics",
                method: "GET",
                credentials: "include" as const
            })
        }), 
        getSeedAnalytics: builder.query({
            query: () => ({
                url: "get-monthly-seed-analytics",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getStoreIncomeAnalytics: builder.query({
            query: () => ({
                url: "get-monthly-store-income-analytics",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getStoreTaxAnalytics: builder.query({
            query: () => ({
                url: "get-monthly-store-tax-analytics",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getStoreDeliveryFeeAnalytics: builder.query({
            query: () => ({
                url: "get-monthly-store-delivery-charges-analytics",
                method: "GET",
                credentials: "include" as const
            }) 
        })
    })
})

export const {
    useGetIncomeAnalyticsQuery,
    useGetUsersAnalyticsQuery,
    useGetOrdersAnalyticsQuery,
    useGetOfferingAnalyticsQuery,
    useGetSeedAnalyticsQuery,
    useGetStoreIncomeAnalyticsQuery,
    useGetStoreTaxAnalyticsQuery,
    useGetStoreDeliveryFeeAnalyticsQuery,
    useGetAnanimousAnalyticsQuery
} = analyticsApi;