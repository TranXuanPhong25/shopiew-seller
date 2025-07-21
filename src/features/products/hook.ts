import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CreateProductData } from "./model";
import { ProductsService } from "./service";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/ErrorResponse";
const sectionsNav = [
   { id: "basic-info-section", label: "Thông tin cơ bản" },
   { id: "sales-info-section", label: "Thông tin bán hàng" },
   { id: "shipping-section", label: "Vận chuyển" },
   { id: "other-info-section", label: "Thông tin khác" },
];
const useSectionsNav = () => {

   const [currentTab, setCurrentTab] = useState<string>(sectionsNav[0].id);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  setCurrentTab(entry.target.id)
               }
            })
         },
         { threshold: 1 },
      )

      document.querySelectorAll("section[id]").forEach((section) => {
         observer.observe(section)
      })

      return () => observer.disconnect()
   }, [])
   return {
      currentTab
   };
}

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
const useCategorySelection = () => {
   const [selectedCategory, setSelectedCategory] = useState<string>("");
   const [path, setPath] = useState<string[]>([]);
   const { isLoading, categoryAndChildren } = useGetCategoryAndChildren(selectedCategory);

   const pushToPath = (category: string, isShift: boolean) => {
      const [id, name] = category.split("-");

      setPath((prevPath) => {
         if (isShift) {
            return prevPath.slice(0, prevPath.length - 1);
         }
         const newPath = [...prevPath, name];
         return newPath;
      });

      setSelectedCategory(id);
   };
   return {
      isLoading,
      categoryAndChildren,
      selectedCategory,
      path,
      pushToPath
   };
}

const useGetCategoryAndChildren = (categoryId: string) => {
   const { isLoading, data: categoryAndChildren } = useQuery({
      queryKey: ["categoryAndChildren", categoryId],
      queryFn: async () => {
         try {
            const response = await ProductsService.getCategoryAndChildren(categoryId);
            return response;
         } catch (error) {
            if (error instanceof Error) {
               toast.error(error.message);
            } else {
               toast.error("An unexpected error occurred while fetching child categories.");
            }
            throw error; // Re-throw to handle it in the component`
         }
      },
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
   });
   return {
      isLoading,
      categoryAndChildren,
   };
}

export {
   useSectionsNav,
   sectionsNav,
   useCreateProduct,
   useCategorySelection,
   useGetCategoryAndChildren
};