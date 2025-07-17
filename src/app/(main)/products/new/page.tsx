import NewProductForm from "@/features/products/new/new-product-form";
import SectionsNav from "@/features/products/sections-nav";
const ProductsManagementPage = () => {
   return (
      <div className="container mx-auto p-6 bg-white">
         <SectionsNav />
         <NewProductForm />
      </div>
   );
}

export default ProductsManagementPage;