import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ProductsSchema } from "../../types/products-schema"
import { getProducts } from "../services/get-products"
import { searchProducts } from "../services/search-products"
import { addProduct } from "../services/add-product"

const initialState: ProductsSchema = {
    isLoading: false,
    error: "",
    products: [],
    progress: 0,
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProgress: (state, action: PayloadAction<number>) => {
            state.progress = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload || "error"
            })
            .addCase(searchProducts.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.products = action.payload
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload || "error"
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.products = [action.payload, ...state.products]
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload || "error"
            })
    },
})

export const { actions: productsActions, reducer: productsReducer } = productsSlice
