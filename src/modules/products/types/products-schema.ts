import type { Product } from "./product"

export interface ProductsSchema {
    isLoading: boolean
    error: string
    products: Product[]
    progress: number
}
