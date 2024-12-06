import { apiSlice } from "../api/apiSlice";

export const offeringApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOffering: builder.query({
            query: () => ({
                url: "all-offering",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getAllCathedral: builder.query({
            query: () => ({
                url: "all-cathedral-seed",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getTotalOffering: builder.query({
            query: () => ({ 
                url: "income-offering", 
                method: "GET",
                credentials: "include" as const
            })
        }),
    })
})

export const {
    useGetAllOfferingQuery,
    useGetAllCathedralQuery,
    useGetTotalOfferingQuery
} = offeringApi;