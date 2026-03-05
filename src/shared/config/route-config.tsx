import { AuthForm } from "@/modules/auth"
import { Products } from "@/modules/products"
import type { RouteProps } from "react-router-dom"

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
}

export enum AppRoutes {
    LOGIN = "login",
    PRODUCTS = "products",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LOGIN]: "/",
    [AppRoutes.PRODUCTS]: "/products",
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.LOGIN]: {
        path: RoutePath[AppRoutes.LOGIN],
        element: <AuthForm />,
    },
    [AppRoutes.PRODUCTS]: {
        path: RoutePath[AppRoutes.PRODUCTS],
        element: <Products />,
        authOnly: true,
    },
}
