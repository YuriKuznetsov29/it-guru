import { useAppDispatch } from "@/shared/lib/hook/useAppDispatch";
import { Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { getProducts } from "../model/services/get-products";
import { searchProducts } from "../model/services/search-products";
import { SearchOutlined } from "@ant-design/icons";
import { LogoutButton } from "@/shared/ui/logout-button/logout-button";

const { Title } = Typography;

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
    }, [query, dispatch]);

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 24,
                backgroundColor: "#fff",
                padding: "28px 28px",
                flexWrap: "wrap",
            }}
        >
            <Title
                level={4}
                style={{
                    margin: 0,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.85)",
                    flexShrink: 0,
                    fontSize: 22,
                }}
            >
                Товары
            </Title>
            <div
                style={{
                    flex: "1 1 320px",
                    minWidth: 220,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    borderRadius: 8,
                    overflow: "hidden",
                }}
            >
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    allowClear
                    placeholder="Найти"
                    prefix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
                    bordered={false}
                    style={{
                        backgroundColor: "#f5f5f5",
                        height: 40,
                    }}
                />
            </div>
            <LogoutButton />
        </div>
    );
};
