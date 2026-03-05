import React, { useEffect, useRef, useState } from "react";
import { Alert, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useAppDispatch } from "@/shared/lib/hook/useAppDispatch";
import { getProducts } from "../model/services/get-products";
import { useAppSelector } from "@/shared/lib/hook/useAppSelector";
import { getProductsState } from "../model/selectors/get-products-state";
import type { Product } from "../types/product";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"];

export const Products: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
            render: (text, record) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={record.images[0]}
                        alt={text}
                        style={{
                            width: 40,
                            height: 40,
                            marginRight: 8,
                            objectFit: "cover",
                            borderRadius: 4,
                        }}
                    />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: "Вендор",
            dataIndex: "brand",
        },
        {
            title: "Артикул",
            dataIndex: "sku",
        },
        {
            title: "Оценка",
            dataIndex: "rating",
            sorter: (a, b) => a.rating - b.rating,
            sortOrder: sorter.field === "rating" ? sorter.order : null,
        },
        {
            title: "Цена",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
            sortOrder: sorter.field === "price" ? sorter.order : null,
        },
    ];

    const { products, error, isLoading } = useAppSelector(getProductsState);

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
    }, []);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<Product> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: "odd",
                text: "Select Odd Row",
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: "even",
                text: "Select Even Row",
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };

    const handleTableChange: TableProps<Product>["onChange"] = (pagination, filters, sorter) => {
        if (!Array.isArray(sorter)) {
            setSorter({
                field: sorter.field as string,
                order: sorter.order ?? undefined,
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
                dataSource={products}
                // loading={isLoading}
                onRow={(record) => ({
                    style: record.rating < 3 ? { backgroundColor: "#fff1f0" } : undefined,
                })}
                onChange={handleTableChange}
            />
        </>
    );
};
