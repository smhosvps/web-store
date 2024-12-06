import { apiSlice } from "../api/apiSlice";


export const createartisanApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createArtisan: builder.mutation({
            query: (data) => ({
                url: "create-blog",
                method: "POST",
                body: data,
                credentials: "include" as const
            })
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: "get-all-courses-admin",
                method: "GET",
                credentials: "include" as const
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        }),
        editArtisan: builder.mutation({
            query: ({ id, data }) => ({
                url: `edit-course/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const
            })
        }),

    })
})

export const {
    useCreateArtisanMutation,
    useGetAllCoursesQuery,
    useDeleteCourseMutation,
} = createartisanApi;