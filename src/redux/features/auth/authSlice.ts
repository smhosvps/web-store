import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    resetToken: "",
    token: "",
    user: "",
    accessToken: localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        forgotPassword: (state, action: PayloadAction<{ resetToken: string }>) => {
            state.resetToken = action.payload.resetToken;
        },
        userRegistration: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
        userLoggedIn: (state, action: PayloadAction<{ accessToken: string, user: string }>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            localStorage.setItem('accessToken', action.payload.accessToken);
        },
        userLoggedOut: (state) => {
            state.accessToken = "";
            state.user = "";
            localStorage.removeItem('accessToken');
        }
    }
});

export const { userRegistration, userLoggedIn, userLoggedOut, forgotPassword } = authSlice.actions;
export default authSlice.reducer;
