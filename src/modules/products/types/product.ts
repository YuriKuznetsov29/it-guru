export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    images: string[];
    rating: number;
    brand?: string;
    sku?: string;
}
