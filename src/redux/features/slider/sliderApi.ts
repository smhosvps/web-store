import { apiSlice } from "../api/apiSlice";

export const sliderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createSlider: builder.mutation({
            query: (data) => ({
                url: "create-slider",
                method: "POST",
                body: data,
                credentials: "include" as const
            })
        }), 
        getAllSlider: builder.query({
            query: () => ({
                url: "all-slider",
                method: "GET",
                credentials: "include" as const
            })
        }),
        deleteSlider: builder.mutation({
            query: (id) => ({
                url: `delete-slider/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        }),
        editSlider: builder.mutation({
            query: ({ id, data }) => ({
                url: `edit-slider/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const
            })
        }),
    })
})

export const {
useCreateSliderMutation,
useDeleteSliderMutation,
useEditSliderMutation,
useGetAllSliderQuery
} = sliderApi;