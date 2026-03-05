import type { AuthSchema } from "../../../modules/auth"
import type { ProductsSchema } from "@/modules/products/types/products-schema"

export interface StateSchema {
    auth: AuthSchema
    products: ProductsSchema
}
