import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { StoreProvider } from "./providers/store-provider/ui/store-provider.tsx"
import type { StateSchema } from "./providers/store-provider/config/state-schema.ts"
import $api from "./shared/api/api.ts"
import type { AuthResponse } from "./modules/auth/index.ts"
import { BrowserRouter } from "react-router"
import type { PreloadedState } from "redux"
import "antd/dist/reset.css"
import "./index.css"

const init = async () => {
    const token = localStorage.getItem("refreshToken")

    let initialState: PreloadedState<StateSchema> = {}

    if (token) {
        try {
            const response = await $api.post<AuthResponse>(`/auth/refresh`, {
                refreshToken: localStorage.getItem("refreshToken"),
            })

            const accessToken = response.data?.accessToken

            if (accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem("refreshToken", response.data.refreshToken)
                initialState = {
                    auth: {
                        isAuth: true,
                    },
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <StoreProvider initialState={initialState}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </StoreProvider>
        </StrictMode>,
    )
}

init()
