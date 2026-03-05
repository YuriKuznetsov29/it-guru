import { createAsyncThunk } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"
import type { AuthResponse } from "../../../types/auth-response"
import $api from "../../../../../shared/api/api"

interface RequestAuthData {
    username: string
    password: string
}

export const login = createAsyncThunk<AuthResponse, RequestAuthData, { rejectValue: string }>(
    "login/signIn",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await $api.post<AuthResponse>("/auth/login", {
                username,
                password,
            })
            console.log(response)

            const saveAuth = localStorage.getItem("saveAuth")

            if (saveAuth === "true") {
                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem("refreshToken", response.data.refreshToken)
            } else {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                sessionStorage.setItem("accessToken", response.data.accessToken)
                sessionStorage.setItem("refreshToken", response.data.refreshToken)
            }

            return response.data
        } catch (e) {
            console.log(e)
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data.error.message)
            } else {
                return rejectWithValue("error")
            }
        }
    },
)
