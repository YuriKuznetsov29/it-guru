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
    error: "",
}

export const authSlice = createSlice({
    name: "authorization",
    initialState,
    reducers: {
        setInit: (state) => {
            state.initAuth = true
        },
        logout: (state) => {
            state.isAuth = false
            state.error = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.initAuth = true
                state.isLoading = true
                state.error = ""
            })
            .addCase(login.fulfilled, (state) => {
                state.isLoading = false
                state.isAuth = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                console.log(action, "action")
                state.error = action.payload || "Login error"
            })
    },
})

export const { actions: authActions, reducer: authReducer } = authSlice
