   import { DataTable } from "@/features/products/products-table";
   import data from "@/features/products/data.json"
   import SectionWrapper from "@/components/layout/section-wrapper";
   const ProductsManagementPage = () => {
      return (
         <div className="w-full mt-4 gap-4 ">
            <SectionWrapper >
               <DataTable
                  data={data}

               />
            </SectionWrapper>
         </div>
      );
   }

   export default ProductsManagementPage;