import { apiSlice } from "../api/apiSlice";

export const titheApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTitheRecords: builder.mutation({
            query: (data) => ({
                url: "create-tithe-record",
                method: "POST",
                body: data,
                credentials: "include" as const
            })
        }),
        getAllTitheRecords: builder.query({
            query: () => ({
                url: "all-records",
                method: "GET",
                credentials: "include" as const
            })
        }),
    })
})

export const {
    useCreateTitheRecordsMutation,
    useGetAllTitheRecordsQuery
} = titheApi;