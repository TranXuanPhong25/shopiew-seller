
import { Metadata } from "next/types";
import ProductCollection from "@/features/products/components/ProductCollection";
const ProductsManagementPage = () => {
   return <ProductCollection />;
}

export const metadata: Metadata = {
   title: 'Manage products |Shopiew Seller',
};

export default ProductsManagementPage;