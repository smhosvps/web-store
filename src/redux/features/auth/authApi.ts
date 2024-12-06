import { apiSlice } from "../api/apiSlice";
import { forgotPassword, userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";


type RegistrationResponse = {
    message: string;
    activationToken: string
    resetToken: string
    accessToken: string
}

type RegistrationData = {};


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoins here
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken
                        })
                    )
                } catch (error: any) {
                    console.log(error)
                }
            }
        }),
        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: "activate-user",
                method: "POST",
                body: {
                    activation_token,
                    activation_code
                }
            })
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "login",
                method: "POST",
                credentials: "include" as const,
                body: {
                    email,
                    password
                }
            }), 
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,

                        })
                    )
                } catch (error: any) {
                    console.log(error)
                }
            }
        }),
        forgot_password: builder.mutation({
            query: ({ email }) => ({
                url: "forgot-password",
                method: "POST",
                // credentials: "include" as const,
                body: {
                    email,
                }
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        forgotPassword({
                            resetToken: result.data.resetToken,
                        })
                    )
                } catch (error: any) {
                    console.log(error)
                }
            }
        }),
        reset_password: builder.mutation({
            query: ({ token, newPassword, reset_code }) => ({
                url: "reset-password",
                method: "POST",
                // credentials: "include" as const,
                body: {
                    token,
                    reset_code,
                    newPassword
                }
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                } catch (error: any) {
                    console.log(error)
                }
            }
        }),
        sendNewResetOtp: builder.mutation({
            query: ({ email }) => ({
                url: "send-new-password-reset-otp",
                method: "POST",
                // credentials: "include" as const,
                body: {
                    email,
                }
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        forgotPassword({
                            resetToken: result.data.resetToken,
                        })
                    )
                } catch (error: any) {
                    console.log(error)
                }
            }
        }),
        socialAuth: builder.mutation({
            query: ({ email, name, avatar }) => ({
                url: "social-auth",
                method: "POST",
                credentials: "include" as const,
                body: {
                    email,
                    name,
                    avatar
                }
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

        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
    })
})

export const {
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation,
    useSocialAuthMutation, 
    useLogoutMutation,
    useForgot_passwordMutation,
    useReset_passwordMutation,
    useSendNewResetOtpMutation
} = authApi;