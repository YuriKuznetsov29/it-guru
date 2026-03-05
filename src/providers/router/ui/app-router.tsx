import { Route, Routes } from "react-router-dom"
import { RequireAuth } from "./require-auth"
import { routeConfig, type AppRoutesProps } from "@/shared/config/route-config"

export const AppRouter = () => {
    const renderWithWrapper = (route: AppRoutesProps) => {
        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? <RequireAuth>{route.element}</RequireAuth> : route.element
                }
            />
        )
    }

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
}
