import { addProduct } from "@/modules/products/model/services/add-product";
import { useAppDispatch } from "@/shared/lib/hook/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hook/useAppSelector";
import { Button, Flex, Form, Input, InputNumber, Modal, Typography, message } from "antd";
import { useState } from "react";
import { getProductsState } from "../model/selectors/get-products-state";
const { Text } = Typography;

export const AddProduct = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(getProductsState);

    const handleAddSubmit = async () => {
        try {
            const values = await form.validateFields();
            await dispatch(
                addProduct({
                    title: values.title,
                    price: values.price,
                    brand: values.brand,
                    sku: values.sku,
                })
            ).unwrap();
            message.success("Товар успешно добавлен");
            setIsAddModalOpen(false);
            form.resetFields();
        } catch (err) {
            if (typeof err === "string") {
                message.error(err);
            }
        }
    };

    return (
        <>
            <Flex style={{ width: "100%" }} align="center" justify="space-between">
                <Text strong>Все позиции</Text>
                <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
                    Добавить
                </Button>
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
    );
};
