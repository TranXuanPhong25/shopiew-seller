import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from 'lucide-react'
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form"
import { NewProductFormData } from "@/lib/validations"
import VariantOptions from "./variant-options"

type SalesInfoSectionProps = {
   register: UseFormRegister<NewProductFormData>
   control: Control<NewProductFormData, any, NewProductFormData>
   errors: FieldErrors<NewProductFormData>
}

const SalesInfoSection = ({ register, control, errors }: SalesInfoSectionProps) => {
   return (
      <section
            id="sales-info-section"
            className=" mt-8 space-y-8 p-6 bg-white rounded-lg shadow-sm max-w-5xl mx-auto">
         <h2 className="text-2xl font-bold mb-2">Thông tin bán hàng</h2>

         <div className="">
            <Label htmlFor="product-classification" className="text-base font-normal">
               <span className="text-red-500">*</span> Phân loại hàng
            </Label>
            <div>
               <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
               >
                  Thêm nhóm phân loại
               </Button>
            </div>
         </div>

         <div className="">
            <Label htmlFor="price" className="text-base font-normal">
               <span className="text-red-500">*</span> Giá
            </Label>
            <div>
               <div className="flex items-center gap-2">
                  <Input id="price" placeholder="0" {...register("price")}  />
                  <span className="text-muted-foreground">đ</span>
               </div>
               {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
         </div>
         <VariantOptions />
         {/* Stock Quantity */}
         <div className="grid  md:grid-cols-2 gap-6">
            <div className=" ">
               <Label htmlFor="stock-quantity" className="text-base font-normal gap-1 flex items-center">
                  <span className="text-red-500">*</span> Kho hàng
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Info className="w-4 h-4 text-muted-foreground cursor-help ml-1" />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>Số lượng sản phẩm có sẵn trong kho.</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               </Label>
               <div>
                  <div className="flex items-center gap-2">
                     <Input id="stock-quantity" placeholder="0" {...register("stockQuantity")} />
                  </div>
                  {errors.stockQuantity && <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>}
               </div>
            </div>

            {/* Max Purchase Quantity */}
            <div className="">
               <Label htmlFor="max-purchase-quantity" className="text-base font-normal flex items-center gap-1">
                  <span>Số Lượng Mua Tối Đa</span>
                     <TooltipProvider>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-muted-foreground cursor-help ml-1" />
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>Số lượng tối đa khách hàng có thể mua trong một đơn hàng.</p>
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
               </Label>
               <div>
                  <div className="flex items-center gap-2">
                     <Controller
                        name="maxPurchaseQuantity"
                        control={control}
                        render={({ field }) => (
                           <Select onValueChange={field.onChange} defaultValue={field.value} >
                              <SelectTrigger className="w-full" id="max-purchase-quantity">
                                 <SelectValue placeholder="Không" />
                              </SelectTrigger>
                              <SelectContent >
                                 <SelectItem value="Không">Không</SelectItem>
                                 <SelectItem value="1">1</SelectItem>
                                 <SelectItem value="2">2</SelectItem>
                                 <SelectItem value="3">3</SelectItem>
                                 <SelectItem value="4">4</SelectItem>
                                 <SelectItem value="5">5</SelectItem>
                                 <SelectItem value="10">10</SelectItem>
                              </SelectContent>
                           </Select>
                        )}
                     />
                  
                  </div>
                  {errors.maxPurchaseQuantity && (
                     <p className="text-red-500 text-sm mt-1">{errors.maxPurchaseQuantity.message}</p>
                  )}
               </div>
            </div>
         </div>
      </section>
   )
}

export default SalesInfoSection
