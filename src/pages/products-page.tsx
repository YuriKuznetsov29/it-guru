import { Products } from "@/modules/products";
import { AddProduct } from "@/modules/products/ui/add-products";
import { SearchProducts } from "@/modules/products/ui/search-products";
import { MainLayout } from "@/shared/ui/main-layout/main-layout";
import { Card, Flex } from "antd";

export const ProductsPage = () => {
    return (
        <MainLayout>
            <Flex vertical gap={0} style={{ width: "100%" }}>
                <SearchProducts />
                <Card
                    bodyStyle={{ padding: "20px 24px 24px" }}
                    style={{
                        marginTop: 24,
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                        backgroundColor: "#fff",
                    }}
                >
                    <AddProduct />
                    <Products />
                </Card>
            </Flex>
        </MainLayout>
    );
};
