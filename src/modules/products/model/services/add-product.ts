import { createAsyncThunk } from "@reduxjs/toolkit"
import type { Product } from "../../types/product"
import $api from "@/shared/api/api"

export interface AddProductPayload {
    title: string
    price: number
    brand: string
    sku: string
}

export const addProduct = createAsyncThunk<
    Product,
    AddProductPayload,
    {
        rejectValue: string
    }
>("products/addProduct", async (payload, { rejectWithValue }) => {
    try {
        const response = await $api.post<Product>("/products/add", payload)
        return response.data
    } catch (e: unknown) {
        console.log(e)
        return rejectWithValue("error")
    }
})

