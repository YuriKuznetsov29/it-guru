import { createSlice } from "@reduxjs/toolkit"

import type { AuthSchema } from "../../types/auth-schema"
import { login } from "../services/login/login"

export interface signInState {
    value: number
}

const initialState: AuthSchema = {
    isLoading: false,
    initAuth: false,
    isAuth: false,
    email: "",
    password: "",
    regSuccess: false,
}

export const authSlice = createSlice({
    name: "authorization",
    initialState,
    reducers: {
        setInit: (state) => {
            state.initAuth = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.initAuth = true
                state.isLoading = true
                state.error = undefined
            })
            .addCase(login.fulfilled, (state) => {
                state.isLoading = false
                state.isAuth = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
        // .addCase(signUpByEmail.pending, (state) => {
        //     state.isLoading = true
        //     state.error = undefined
        // })
        // .addCase(signUpByEmail.fulfilled, (state) => {
        //     state.error = ''
        //     state.regSuccess = true
        //     state.isLoading = false
        // })
        // .addCase(signUpByEmail.rejected, (state, action) => {
        //     state.isLoading = false
        //     state.error = action.payload
        // })
        // .addCase(checkAuth.pending, (state) => {
        //     state.isLoading = true
        //     state.initAuth = true
        //     state.error = undefined
        // })
        // .addCase(checkAuth.fulfilled, (state) => {
        //     state.isLoading = false
        //     state.isAuth = true
        // })
        // .addCase(checkAuth.rejected, (state, action) => {
        //     state.isLoading = false
        //     state.error = action.payload
        // })
        // .addCase(signOut.fulfilled, (state) => {
        //     state.isAuth = false
        //     state.initAuth = false
        // })
        // .addCase(changeUserData.fulfilled, (state) => {
        //     state.isLoading = false
        // })
        // .addCase(changeUserData.rejected, (state) => {
        //     state.isLoading = false
        // })
        // .addCase(changeUserData.pending, (state) => {
        //     // state.isLoading = true
        // })
    },
})

export const { actions: authActions, reducer: authReducer } = authSlice
