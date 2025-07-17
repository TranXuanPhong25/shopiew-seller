import { DataTable } from "@/features/products/products-table";
import data from "@/features/products/data.json"
const ProductsManagementPage = () => {
   return (
      <div>
         <DataTable data={data}/>
      </div>
   );
}

export default ProductsManagementPage;