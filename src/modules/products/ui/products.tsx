import React, { useEffect, useRef, useState } from "react"
import { Alert, Button, Form, Input, InputNumber, Modal, Progress, Table, message } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import { useAppDispatch } from "@/shared/lib/hook/useAppDispatch"
import { getProducts } from "../model/services/get-products"
import { useAppSelector } from "@/shared/lib/hook/useAppSelector"
import { getProductsState } from "../model/selectors/get-products-state"
import type { Product } from "../types/product"
import { searchProducts } from "../model/services/search-products"
import { addProduct } from "../model/services/add-product"
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar"

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

const columns: TableColumnsType<Product> = [
    {
        title: "Наименование",
        dataIndex: "title",
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
    },
    {
        title: "Цена",
        dataIndex: "price",
    },
]

export const Products: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [query, setQuery] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [form] = Form.useForm()
    const loadingBar = useRef<LoadingBarRef | null>(null)

    const dispatch = useAppDispatch()

    const { products, error, isLoading } = useAppSelector(getProductsState)

    useEffect(() => {
        if (!loadingBar.current) return
        if (isLoading) {
            loadingBar.current.continuousStart()
        } else {
            loadingBar.current.complete()
        }
    }, [isLoading])

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    useEffect(() => {
        const handle = setTimeout(() => {
            const trimmed = query.trim()
            if (!trimmed) {
                dispatch(getProducts())
                return
            }

            dispatch(searchProducts(trimmed))
        }, 350)

        return () => clearTimeout(handle)
    }, [query])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
    }

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
                    let newSelectedRowKeys = []
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false
                        }
                        return true
                    })
                    setSelectedRowKeys(newSelectedRowKeys)
                },
            },
            {
                key: "even",
                text: "Select Even Row",
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = []
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true
                        }
                        return false
                    })
                    setSelectedRowKeys(newSelectedRowKeys)
                },
            },
        ],
    }

    const handleAddSubmit = async () => {
        try {
            const values = await form.validateFields()
            await dispatch(
                addProduct({
                    title: values.title,
                    price: values.price,
                    brand: values.brand,
                    sku: values.sku,
                })
            ).unwrap()
            message.success("Товар успешно добавлен")
            setIsAddModalOpen(false)
            form.resetFields()
        } catch (err) {
            if (typeof err === "string") {
                message.error(err)
            }
        }
    }

    return (
        <>
            <LoadingBar color="#1890ff" ref={loadingBar} />
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    allowClear
                    placeholder="Поиск товаров"
                    style={{ flex: 1 }}
                />
                <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
                    Добавить
                </Button>
            </div>
            {!!error && <Alert style={{ marginBottom: 12 }} type="error" message={error} />}
            <Table<Product>
                rowKey="id"
                rowSelection={rowSelection}
                columns={columns}
                dataSource={products}
                loading={isLoading}
                onRow={(record) => ({
                    style: record.rating < 3 ? { backgroundColor: "#fff1f0" } : undefined,
                })}
            />

            <Modal
                title="Добавление товара"
                open={isAddModalOpen}
                onCancel={() => setIsAddModalOpen(false)}
                onOk={handleAddSubmit}
                confirmLoading={isLoading}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Наименование"
                        rules={[{ required: true, message: "Введите наименование" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Цена"
                        rules={[{ required: true, message: "Введите цену" }]}
                    >
                        <InputNumber style={{ width: "100%" }} min={0} />
                    </Form.Item>
                    <Form.Item
                        name="brand"
                        label="Вендор"
                        rules={[{ required: true, message: "Введите вендора" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="sku"
                        label="Артикул"
                        rules={[{ required: true, message: "Введите артикул" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
