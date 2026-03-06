import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, Typography, type CheckboxChangeEvent } from "antd";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/providers/store-provider/config/config";
import { login } from "../model/services/login/login";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/shared/lib/hook/useAppSelector";
import { getAuthStore } from "../model/selectors/get-auth-store";
import { LogoIcon } from "./logo-icon";

const { Title, Text } = Typography;

export const AuthForm: React.FC = () => {
    const [saveAuth, setSaveAuth] = React.useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { isAuth, isLoading, error } = useAppSelector(getAuthStore);
    const navigate = useNavigate();

    const onFinish = async (values: { username: string; password: string }) => {
        dispatch(login({ username: values.username, password: values.password }));
    };

    const onSaveAuthChange = (e: CheckboxChangeEvent) => {
        setSaveAuth(e.target.checked);
    };

    useEffect(() => {
        if (saveAuth) {
            localStorage.setItem("saveAuth", "true");
        } else {
            localStorage.removeItem("saveAuth");
        }
    }, [saveAuth]);

    useEffect(() => {
        if (isAuth) {
            navigate("/products");
        }
    }, [isAuth]);

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f0f2f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 400,
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
                    padding: "40px 32px",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{ marginBottom: 24, color: "#000" }}>
                        <LogoIcon />
                    </div>
                    <Title level={3} style={{ margin: 0, marginBottom: 8, fontWeight: 600 }}>
                        Добро пожаловать!
                    </Title>
                    <Text type="secondary" style={{ fontSize: 14 }}>
                        Пожалуйста, авторизируйтесь
                    </Text>
                </div>

                {error && (
                    <Alert type="error" message={error} style={{ marginBottom: 24 }} showIcon />
                )}

                <Form
                    name="login"
                    initialValues={{ username: "test" }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        name="username"
                        label="Логин"
                        rules={[{ required: true, message: "Введите логин" }]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                            placeholder="test"
                            allowClear
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{ required: true, message: "Введите пароль" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                            placeholder="••••••••"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 24 }}>
                        <Checkbox checked={saveAuth} onChange={onSaveAuthChange}>
                            Запомнить данные
                        </Checkbox>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 24 }}>
                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            size="large"
                            style={{
                                height: 44,
                                borderRadius: 8,
                                fontWeight: 600,
                                backgroundColor: "#1890ff",
                                borderColor: "#1890ff",
                            }}
                        >
                            Войти
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            или
                        </Text>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                            Нет аккаунта?{" "}
                            <a href="#" style={{ fontWeight: 500 }}>
                                Создать
                            </a>
                        </Text>
                    </div>
                </Form>
            </div>
        </div>
    );
};
