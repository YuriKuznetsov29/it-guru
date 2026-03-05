import { useAppDispatch } from "@/shared/lib/hook/useAppDispatch";
import { Button, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { getProducts } from "../model/services/get-products";
import { searchProducts } from "../model/services/search-products";
import { LogoutOutlined, SearchOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

export const SearchProducts = () => {
    const [query, setQuery] = useState("");

    const dispatch = useAppDispatch();

    useEffect(() => {
        const handle = setTimeout(() => {
            const trimmed = query.trim();
            if (!trimmed) {
                dispatch(getProducts());
                return;
            }

            dispatch(searchProducts(trimmed));
        }, 350);

        return () => clearTimeout(handle);
    }, [query]);

    return (
        <div
            style={{
                width: "100%",
                height: "105px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "30px",
            }}
        >
            <Title level={5} style={{ margin: 0 }}>
                Товары
            </Title>
            <div
                style={{
                    width: "100%",
                    maxWidth: "1048px",
                    height: "48px",
                    display: "flex",
                    gap: 8,
                    marginBottom: 12,
                }}
            >
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    allowClear
                    placeholder="Поиск товаров"
                    prefix={<SearchOutlined style={{ color: "#999" }} />}
                    // style={{ flex: 1 }}
                />
            </div>
            <Button type="primary" shape="round" icon={<LogoutOutlined />} size={"medium"} />
        </div>
    );
};
