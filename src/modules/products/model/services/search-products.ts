import { createAsyncThunk } from "@reduxjs/toolkit"
import type { Product } from "../../types/product"
import $api from "@/shared/api/api"

export const searchProducts = createAsyncThunk<
    Product[],
    string,
    {
        rejectValue: string
    }
>("products/searchProducts", async (query, { rejectWithValue }) => {
    try {
        const q = query.trim()
        const response = await $api.get<{ products: Product[] }>(`/products/search?q=${encodeURIComponent(q)}`)
        return response.data.products
    } catch (e: unknown) {
        console.log(e)
        return rejectWithValue("error")
    }
})
