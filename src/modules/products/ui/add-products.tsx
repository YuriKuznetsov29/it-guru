import { addProduct } from "@/modules/products/model/services/add-product"
import { getProducts } from "@/modules/products/model/services/get-products"
import { useAppDispatch } from "@/shared/lib/hook/useAppDispatch"
import { useAppSelector } from "@/shared/lib/hook/useAppSelector"
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { Button, Flex, Form, Input, InputNumber, Modal, Typography, message } from "antd"
import { useState } from "react"
import { getProductsState } from "../model/selectors/get-products-state"

const { Text } = Typography

export const AddProduct = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector(getProductsState)

    const handleAddSubmit = async () => {
        try {
            const values = await form.validateFields()
            await dispatch(
                addProduct({
                    title: values.title,
                    price: values.price,
                    brand: values.brand,
                    sku: values.sku,
                }),
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

    const handleRefresh = () => {
        dispatch(getProducts())
    }

    return (
        <>
            <Flex
                style={{ width: "100%", padding: "0 0 16px" }}
                align="center"
                justify="space-between"
            >
                <Text strong style={{ fontSize: 16, color: "rgba(0,0,0,0.88)" }}>
                    Все позиции
                </Text>
                <Flex align="center" gap={12}>
                    <Button
                        type="default"
                        shape="circle"
                        icon={<ReloadOutlined />}
                        onClick={handleRefresh}
                        style={{
                            backgroundColor: "#f5f5f5",
                            borderColor: "#f5f5f5",
                            color: "rgba(0,0,0,0.65)",
                        }}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsAddModalOpen(true)}
                        style={{ borderRadius: 8 }}
                    >
                        Добавить
                    </Button>
                </Flex>
            </Flex>
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
