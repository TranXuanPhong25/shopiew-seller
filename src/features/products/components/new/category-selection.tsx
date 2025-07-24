import { NewProductFormData } from "@/lib/validations"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { useCategorySelection, useGetCategoryAndChildren } from "../../hook"
import CategorySelectionItems from "./category-selection-items"
import { toast } from "sonner"
import { useEffect } from "react"

type BasicInfoSectionProps = {
   control: Control<NewProductFormData, any, NewProductFormData>,
   errors: FieldErrors<NewProductFormData>,
   isDirty?: boolean
}
const CategorySelection = ({
   control,
   errors,
   isDirty
}: BasicInfoSectionProps) => {
   const { path, pushToPath, selectedCategory, resetPath } = useCategorySelection();
   const { isLoading, categoryAndChildren } = useGetCategoryAndChildren(selectedCategory);
   useEffect(() => {
      if (!isDirty && path.length > 0) {
         resetPath();
      }
   }, [isDirty, resetPath]);

   const handleValueChange = (value: string, field: any) => {
      toast(value);
      if (!value) return;
      const isShift = value.startsWith("-"); // Check if the value is "-"
      const actualValue = isShift ? value.slice(1) : value; // Remove "---" prefix if present
      field.onChange(actualValue); // Update form value
      pushToPath(actualValue, isShift);
   }
   return (
      <div>
         <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 items-center">
            <Label htmlFor="category" className="text-base font-normal">
               *Ngành hàng
            </Label>
            <div className="grid grid-cols-2 ">
               <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                     <Select
                        onValueChange={(value) => { handleValueChange(value, field) }}
                        value={field.value == "-" ? "" : field.value} // Handle empty value
                     >
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Select product category">
                              {
                                 field.value && field.value.includes('-')
                                    ? field.value.split('-')[1]
                                    : null
                              }
                           </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                           <CategorySelectionItems
                              isLoading={isLoading}
                              categoryAndChildren={categoryAndChildren}
                           />
                        </SelectContent>
                     </Select>
                  )}
               />
               {
                  path.length > 0 && (
                     <div className="flex items-center ml-4">
                        {path.join(" > ")}
                     </div>
                  )
               }
            </div>
         </div>
         {errors.category &&
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 items-center">
               <span></span>
               <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            </div>}
      </div>
   );
}

export default CategorySelection;