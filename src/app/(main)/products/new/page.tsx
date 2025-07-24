import NewProductForm from "@/features/products/components/new/new-product-form";
import VerticalSectionsNav from "@/features/products/components/vertical-sections-nav";
const ProductsManagementPage = () => {
   return (
      <div className="w-full mt-4 flex gap-4 container mx-auto">
         <VerticalSectionsNav />
         <div className="flex-1  ">
            <NewProductForm />
         </div>
      </div>
   );
}

export default ProductsManagementPage;