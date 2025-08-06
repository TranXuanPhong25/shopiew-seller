import {  useMutation } from "@tanstack/react-query";
import { CreateProductData } from "./model";
import { ProductsService } from "./service";

const useCreateProduct = () => {
   const { mutateAsync, isPending, isError, error } = useMutation({
      mutationKey: ["createProduct"],
      mutationFn: async (data: CreateProductData) => {
         try {
            return await ProductsService.createProduct(data);
         } catch (error) {
            throw error; // Re-throw to handle it in the component
         }
      },
   });

   return { createProduct: mutateAsync, isCreating: isPending, isError, error };
}

export {
   useCreateProduct,
};