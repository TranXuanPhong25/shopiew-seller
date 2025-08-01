
import { Metadata } from "next/types";
import ProductCollection from "@/features/products/components/product-collection";
import ProtectedPage from "@/components/auth/ProtectedPage";
import SectionWrapper from "@/components/layout/section-wrapper";
const ProductsManagementPage = () => {
   return (
      <ProtectedPage>
         <div className="w-full mt-4 gap-4 ">
            <SectionWrapper>
               <ProductCollection />
            </SectionWrapper>
         </div>
      </ProtectedPage>
   );
}

export const metadata: Metadata = {
   title: 'Manage products |Shopiew Seller',
};

export default ProductsManagementPage;