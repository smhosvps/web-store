import { apiSlice } from "../api/apiSlice";

export const ananimousApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllAnanimousOffering: builder.query({
            query: () => ({
                url: "all-animous-offering",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getAllAnanimousCount: builder.query({
            query: () => ({
                url: "count-ananimous-offering",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getTotalAnanimousGiveIncome: builder.query({
            query: () => ({
                url: "ananimous-income-offering",
                method: "GET",
                credentials: "include" as const
            })
        }),
    })
})

export const {
   useGetAllAnanimousCountQuery,
   useGetAllAnanimousOfferingQuery,
   useGetTotalAnanimousGiveIncomeQuery
} = ananimousApi;