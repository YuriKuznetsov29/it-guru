import { createAsyncThunk } from "@reduxjs/toolkit"
import type { Product } from "../../types/product"
import $api from "@/shared/api/api"

export interface RequestChangeData {
    userId: string
}

export const getProducts = createAsyncThunk<
    Product[],
    void,
    {
        rejectValue: string
    }
>("products/getProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await $api.get<{ products: Product[] }>("/products", {})
        return response.data.products
    } catch (e: unknown) {
        console.log(e)
        return rejectWithValue("error")
    }
})
