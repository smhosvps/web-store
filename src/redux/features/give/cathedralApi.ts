import { apiSlice } from "../api/apiSlice";

export const cathedralApi = apiSlice.injectEndpoints({
    endpoints: (builder:any) => ({
        getAllCathedralX: builder.query({
            query: () => ({
                url: "all-cathedral-seed",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getAllSeedsIncomTotal: builder.query({
            query: () => ({
                url: "income-cathedral-seed",
                method: "GET",
                credentials: "include" as const
            })
        }),
    })
})

export const {
    useGetAllCathedralXQuery,
    useGetAllSeedsIncomTotalQuery
} = cathedralApi;