import { configureStore } from "@reduxjs/toolkit"
import type { PreloadedState } from "redux"
import { authReducer } from "@/modules/auth/model/slice/auth-slice"
import type { StateSchema } from "./state-schema"
import { productsReducer } from "@/modules/products/model/slice/products-slice"

export function createReduxStore(preloadedState?: PreloadedState<StateSchema>) {
    return configureStore({
        reducer: {
            auth: authReducer,
            products: productsReducer,
        },
        preloadedState,
    })
}

export const store = createReduxStore()

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
export type RootState = ReturnType<typeof createReduxStore>["getState"]
