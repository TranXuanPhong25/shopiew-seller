import axiosClient from "@/utils/axiosClient";
import { CreateProductData, GetProductResponse, Product } from "./model";
import { ErrorResponse } from "@/types/ErrorResponse";
import axios from "axios";


export const ProductsService = {
   createProduct: async (data: CreateProductData): Promise<Product> => {
      try {
         const response = await axiosClient.post<Product>("/products", data);
         return response.data;
      } catch (err) {
         if (axios.isAxiosError(err) && err.response) {
            throw err.response.data;
         }
         throw err;
      }
   },
   getCategoryAndChildren: async (categoryId: string): Promise<any> => {
      try {
         const response = await axiosClient.get<any>(`/product-categories${categoryId && "/" + categoryId}`);
         return response.data;
      } catch (err) {
         if (axios.isAxiosError(err) && err.response) {
            throw err.response.data as ErrorResponse;
         }
         throw err;
      }
   },
   getProductsByShopId: async (shopId: string): Promise<GetProductResponse> => {
      try {
         const response = await axiosClient.get<GetProductResponse>(`/products?shop_id=${shopId}`);
         return response.data;
      } catch (err) {
         if (axios.isAxiosError(err) && err.response) {
            throw err.response.data as ErrorResponse;
         }
         throw err;
      }
   },

}