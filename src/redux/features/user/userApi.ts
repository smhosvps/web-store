import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-user-avatar",
                method: "PUT",
                body: { avatar },
                credentials: "include" as const
            })
        }),
        editProfile: builder.mutation({
            query: ({ email,
                name,
                phone_number,
                date_of_birth,
                gender,
                occupation,
                location,
                country,
                marrital_status,
                address,
                tithe_number,
                married_to,
                church_name,
                church_address,
                accountType,
                church_country,
                h_name,
                works_at,
                salary_expection,
                working_since,
                service_group,
                is_employed,
                started_since, }) => ({
                    url: "update-user-info",
                    method: "PUT",
                    body: {
                        name,
                        phone_number,
                        date_of_birth,
                        gender,
                        occupation,
                        location,
                        country,
                        marrital_status,
                        address,
                        tithe_number,
                        married_to,
                        church_name,
                        church_address,
                        accountType,
                        church_country,
                        h_name,
                        works_at,
                        salary_expection,
                        working_since,
                        service_group,
                        is_employed,
                        started_since,
                    },
                    credentials: "include" as const
                }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.activationToken,
                            user: result.data.user,

                        })
                    )
                } catch (error: any) {
                    console.log(error)
                }
            }

        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "update-user-password",
                method: "PUT",
                body: { oldPassword, newPassword },
                credentials: "include" as const
            })
        }),
        adminGetUsers: builder.query({
            query: () => ({
                url: "admin-all-user",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getUserInfo: builder.query({
            query: () => ({
                url: "me",
                method: "GET",
                credentials: "include" as const
            })
        }),
        updateRole: builder.mutation({
            query: ({ role, id }) => ({
                url: "update-user-role",
                method: "PUT",
                body: { id, role },
                credentials: "include" as const
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `delete-user/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        }),
        getAllUserCount: builder.query({
            query: () => ({
                url: "all-user-count",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getAllReasons: builder.query({
            query: () => ({
                url: "delete-reasons",
                method: "GET",
                credentials: "include" as const
            })
        }),
        searchUser: builder.query({
            query: ({ tithe_number, phone_number }) => ({
                url: 'search',
                params: { tithe_number, phone_number },
                method: "GET",
                credentials: "include" as const
            }),
        }),
    })
})

export const {
    useUpdateAvatarMutation,
    useEditProfileMutation,
    useUpdatePasswordMutation,
    useDeleteUserMutation,
    useUpdateRoleMutation,
    useGetUserInfoQuery,
    useGetAllUserCountQuery,
    useAdminGetUsersQuery,
    useSearchUserQuery,
    useGetAllReasonsQuery
} = userApi;