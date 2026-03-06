import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/shared/lib/hook/useAppDispatch";
import { getProducts } from "../model/services/get-products";
import { useAppSelector } from "@/shared/lib/hook/useAppSelector";
import { getProductsState } from "../model/selectors/get-products-state";
import type { Product } from "../types/product";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"];

function formatPrice(value: number): string {
    const [intPart, decPart] = value.toFixed(2).split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${formattedInt}.${decPart}`;
}

const PAGE_SIZE = 20;

export const Products: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [activeRowKey, setActiveRowKey] = useState<React.Key | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const loadingBar = useRef<LoadingBarRef | null>(null);
    const [sorter, setSorter] = useState<{
        field?: string;
        order?: "ascend" | "descend";
    }>({});
    const dispatch = useAppDispatch();

    const columns: TableColumnsType<Product> = [
        {
            title: "Наименование",
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 4,
                            backgroundColor: "#f0f0f0",
                            overflow: "hidden",
                            flexShrink: 0,
                        }}
                    >
                        {record.images?.[0] ? (
                            <img
                                src={record.images[0]}
                                alt={text}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        ) : null}
                    </div>
                    <div>
                        <div style={{ fontWeight: 500 }}>{text}</div>
                        {record.category && (
                            <div
                                style={{
                                    fontSize: 12,
                                    color: "rgba(0,0,0,0.45)",
                                    marginTop: 2,
                                }}
                            >
                                {record.category}
                            </div>
                        )}
                    </div>
                </div>
            ),
        },
        {
            title: "Вендор",
            dataIndex: "brand",
            key: "brand",
            render: (val) => val ?? "—",
        },
        {
            title: "Артикул",
            dataIndex: "sku",
            key: "sku",
            render: (val) => val ?? "—",
        },
        {
            title: "Оценка",
            dataIndex: "rating",
            key: "rating",
            sorter: (a, b) => a.rating - b.rating,
            sortOrder: sorter.field === "rating" ? sorter.order : null,
            render: (rating: number) => (
                <span style={{ color: rating < 3 ? "#ff4d4f" : "inherit" }}>
                    {rating.toFixed(1)}/5
                </span>
            ),
        },
        {
            title: "Цена, Р",
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
            sortOrder: sorter.field === "price" ? sorter.order : null,
            render: (price: number) => `${formatPrice(price)} Р`,
        },
        {
            title: "",
            key: "actions",
            width: 100,
            render: (_, record) => (
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <Button
                        type="primary"
                        shape="circle"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                        type="default"
                        shape="circle"
                        size="small"
                        icon={<EllipsisOutlined />}
                        onClick={(e) => e.stopPropagation()}
                        style={{ borderColor: "#d9d9d9" }}
                    />
                </div>
            ),
        },
    ];

    const { products, error, isLoading } = useAppSelector(getProductsState);

    const paginatedProducts = React.useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return products.slice(start, start + PAGE_SIZE);
    }, [products, currentPage]);

    useEffect(() => {
        if (!loadingBar.current) return;
        if (isLoading) {
            loadingBar.current.continuousStart();
        } else {
            loadingBar.current.complete();
        }
    }, [isLoading]);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<Product> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleTableChange: TableProps<Product>["onChange"] = (_, __, sorterObj) => {
        if (!Array.isArray(sorterObj)) {
            setSorter({
                field: sorterObj.field as string,
                order: sorterObj.order ?? undefined,
            });
        }
    };

    return (
        <>
            <LoadingBar color="#1890ff" ref={loadingBar} />
            {!!error && <Alert style={{ marginBottom: 12 }} type="error" message={error} />}
            <Table<Product>
                rowKey="id"
                rowSelection={rowSelection}
                columns={columns}
                dataSource={paginatedProducts}
                onRow={(record) => ({
                    onClick: () => setActiveRowKey(record.id),
                    style: {
                        backgroundColor:
                            activeRowKey === record.id ? "rgba(0,0,0,0.04)" : undefined,
                        borderLeft: activeRowKey === record.id ? "3px solid #1890ff" : undefined,
                    },
                })}
                onChange={handleTableChange}
                pagination={{
                    current: currentPage,
                    total: products.length,
                    pageSize: PAGE_SIZE,
                    showSizeChanger: false,
                    showTotal: (total, [from, to]) => `Показано ${from}-${to} из ${total}`,
                    onChange: setCurrentPage,
                    style: { marginBottom: 0 },
                }}
                className="products-table"
            />
        </>
    );
};
