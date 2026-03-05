import { Navigate, useLocation } from "react-router-dom"
import type { ReactNode } from "react"
import { useAppSelector } from "../../../shared/lib/hook/useAppSelector"
import { getAuthStatus } from "../../../modules/auth/model/selectors/get-auth-status"
import { RoutePath } from "@/shared/config/route-config"

export function RequireAuth({ children }: { children: ReactNode }) {
    const auth = useAppSelector(getAuthStatus)
    const location = useLocation()

    if (!auth) {
        return <Navigate to={RoutePath.login} state={{ from: location }} replace />
    }

    return children
}
