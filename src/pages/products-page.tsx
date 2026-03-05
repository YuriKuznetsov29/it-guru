import { Products } from "@/modules/products";
import { AddProduct } from "@/modules/products/ui/add-products";
import { SearchProducts } from "@/modules/products/ui/search-products";

export const ProductsPage = () => {
    return (
        <>
            <SearchProducts />
            <AddProduct />
            <Products />
        </>
    );
};
