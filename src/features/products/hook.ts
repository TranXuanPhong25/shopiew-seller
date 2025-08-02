import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CreateProductData } from "./model";
import { ProductsService } from "./service";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/ErrorResponse";
import { useAuth } from '../auth/hook';
const sectionsNav = [
   { id: "basic-info-section", label: "Thông tin cơ bản" },
   { id: "products-detail-section", label: "Chi tiết sản phẩm" },
   { id: "sales-info-section", label: "Thông tin bán hàng" },
   { id: "shipping-section", label: "Vận chuyển" },
   { id: "others-info-section", label: "Thông tin khác" },
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
   const resetPath = () => {
      setPath([]);
      setSelectedCategory("");
   };
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
      resetPath,
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
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
   });
   return {
      isLoading,
      categoryAndChildren,
   };
}

const useGetProductsByShopId = (shopId: string, page: number, size: number) => {
   const { isLoading, data, refetch } = useQuery({
      queryKey: ["products", shopId, page, size],
      queryFn: async () => {
         try {
            const response = await ProductsService.getProductsByShopId(shopId, page, size);
            return response;
         } catch (error) {
            if (error instanceof Error) {
               toast.error(error.message);
            } else {
               toast.error("An unexpected error occurred while fetching products.");
            }
            throw error; // Re-throw to handle it in the component
         }
      },
      refetchOnWindowFocus: true,
      refetchInterval: 1000 * 60 * 5, // 5 minutes
      enabled: !!shopId, // Only run the query if shopId is available
      retry: 1,
      refetchOnReconnect: false,
   });
   return {
      isLoading,
      data,
      refetch
   };
}

export const useProductCollection = (shopId: string) => {
   const [page, setPage] = useState(0);
   const [size, setSize] = useState(10);
   const {data , isLoading, refetch } = useGetProductsByShopId(shopId, page, size);
   const [totalElements, setTotalElements] = useState(0);
   useEffect(() => {
      if (data && data.totalElements !== undefined ) {
         setTotalElements(data.totalElements);
      }
   }, [data]);
   const handleChangeSize = (newSize: number) => {
      setSize(newSize);
      setPage(0); // Reset to first page when size changes
   }
   const nextPage = () => {
      setPage((prev) => prev + 1);
   }

   const prevPage = () => {
      setPage((prev) => Math.max(prev - 1, 0));
   }
   
   const lastPage = () => {
      if (data?.totalPages) {
         setPage(data.totalPages-1);
      }
   }

   const firstPage = () => {
      setPage(0);
   }

   return {
      products: data?.content || [],
      totalElements: totalElements,
      totalPages: data?.totalPages || 0,
      pageSize: data?.pageSize || 0,
      pageNumber: data?.pageNumber || 0,
      isLoading,
      page,
      size,
      refetch,
      handleChangeSize,
      nextPage,
      prevPage,
      lastPage,
      firstPage
   };
}

export {
   useSectionsNav,
   sectionsNav,
   useCreateProduct,
   useCategorySelection,
   useGetCategoryAndChildren,
   useGetProductsByShopId,
};