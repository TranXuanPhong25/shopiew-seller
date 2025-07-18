import NewProductForm from "@/features/products/new/new-product-form";
import VerticalSectionsNav from "@/features/products/vertical-sections-nav";
const ProductsManagementPage = () => {
   return (
      <div className="w-full mt-4 flex gap-4 ">
         <div className="p-6 bg-white shadow-md rounded-lg flex-1">

            <NewProductForm />
         </div>
         <VerticalSectionsNav />
      </div>
   );
}

export default ProductsManagementPage;