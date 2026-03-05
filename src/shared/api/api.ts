import axios from "axios"
import type { AuthResponse } from "../../modules/auth"

export const API_URL = "https://dummyjson.com"

const $api = axios.create({
    // withCredentials: true,
    baseURL: API_URL,
    adapter: "xhr",
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    return config
})

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh`, {
                    refreshToken: localStorage.getItem("refreshToken"),
                    // withCredentials: true,
                })

                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem("refreshToken", response.data.refreshToken)
                return $api.request(originalRequest)
            } catch (e) {
                console.log("user in not autorized")
            }
        }
        throw error
    },
)

export default $api
