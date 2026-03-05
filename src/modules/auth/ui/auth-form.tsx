import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Flex, Form, Input, type CheckboxChangeEvent } from "antd";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/providers/store-provider/config/config";
import { login } from "../model/services/login/login";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/shared/lib/hook/useAppSelector";
import { getAuthStore } from "../model/selectors/get-auth-store";

export const AuthForm: React.FC = () => {
    const [saveAuth, setSaveAuth] = React.useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { isAuth, isLoading, error } = useAppSelector(getAuthStore);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        dispatch(login({ username: values.username, password: values.password }));
    };

    const onSaveAuthChange = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setSaveAuth(true);
        } else {
            setSaveAuth(false);
        }
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
        <>
            <div style={{ minHeight: 50 }}>{error && <Alert type="error" title={error} />}</div>
            <Flex style={{ minHeight: "100vh" }} justify="center" align="center">
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360, width: "100%" }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "Please input your Username!" }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please input your Password!" }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" noStyle>
                                <Checkbox checked={saveAuth} onChange={onSaveAuthChange}>
                                    Remember me
                                </Checkbox>
                            </Form.Item>
                            <a href="">Forgot password</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit" loading={isLoading}>
                            Log in
                        </Button>
                        or <a href="">Register now!</a>
                    </Form.Item>
                </Form>
            </Flex>
        </>
    );
};
