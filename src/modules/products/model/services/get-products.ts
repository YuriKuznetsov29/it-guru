import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import $api from "@/shared/api/api";
import { productsActions } from "../slice/products-slice";

export interface RequestChangeData {
    userId: string;
}

export const getProducts = createAsyncThunk<
    Product[],
    void,
    {
        rejectValue: string;
    }
>("products/getProducts", async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await $api.get<{ products: Product[] }>("/products", {
            // adapter: "xhr",
            // onDownloadProgress: (progressEvent) => {
            //     console.log(progressEvent)
            //     if (!progressEvent.total) return
            //     const percentCompleted = Math.round(
            //         (progressEvent.loaded * 100) / progressEvent.total,
            //     )
            //     dispatch(productsActions.setProgress(percentCompleted))
            // },
        });
        return response.data.products;
    } catch (e: unknown) {
        console.log(e);
        return rejectWithValue("error");
    }
});
