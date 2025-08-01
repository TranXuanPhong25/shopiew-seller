"use client";
import { ProductsTable } from "@/features/products/components/products-table";
import SectionWrapper from "@/components/layout/section-wrapper";
import ProtectedPage from "@/components/auth/ProtectedPage";
import { useAuth } from "@/features/auth";
import { useGetProductsByShopId } from "@/features/products/hook";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next/types";
const ProductCollection = () => {
   const { loading, shop } = useAuth();
   const { productsData, isLoading } = useGetProductsByShopId(shop?.id||"");
   if (isLoading || loading) {
      return <Skeleton className="h-screen w-full mt-4" />;
   }
   if (!productsData) {
      return <div>No products found for this shop.</div>;
   }
   return (
      <ProtectedPage>
         <div className="w-full mt-4 gap-4 ">
            <SectionWrapper>
               <ProductsTable
                  products={productsData.content||[]}
                  pageNumber={productsData.pageNumber||0}
                  pageSize={productsData.pageSize||0}
                  totalElements={productsData.totalElements||0}
                  totalPages={productsData.totalPages||0}
                  isLoading={isLoading}
               />
            </SectionWrapper>
         </div>
      </ProtectedPage>
   );
}

export default ProductCollection;