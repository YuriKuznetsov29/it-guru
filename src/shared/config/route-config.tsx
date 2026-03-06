import { MainPage } from "@/pages/main-page"
import { ProductsPage } from "@/pages/products-page"
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
        element: <MainPage />,
    },
    [AppRoutes.PRODUCTS]: {
        path: RoutePath[AppRoutes.PRODUCTS],
        element: <ProductsPage />,
        authOnly: true,
    },
}
