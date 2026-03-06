import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "@/modules/auth/model/slice/auth-slice";
import type { AppDispatch } from "@/providers/store-provider/config/config";
import { AppRoutes, RoutePath } from "@/shared/config/route-config";

interface LogoutButtonProps {
    variant?: "default" | "dark";
}

export const LogoutButton = ({ variant = "default" }: LogoutButtonProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("saveAuth");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        dispatch(authActions.logout());
        navigate(RoutePath[AppRoutes.LOGIN]);
    };

    if (variant === "dark") {
        return (
            <Button
                type="text"
                icon={<LogoutOutlined />}
                size="middle"
                onClick={handleLogout}
                style={{ color: "#fff" }}
            >
                Выйти
            </Button>
        );
    }

    return (
        <Button
            type="primary"
            shape="round"
            icon={<LogoutOutlined />}
            size="medium"
            onClick={handleLogout}
        >
            Выйти
        </Button>
    );
};
