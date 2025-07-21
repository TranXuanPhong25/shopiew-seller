import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { PlayCircle, ImageIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form"
import React, { useEffect } from "react"
import { NewProductFormData } from "@/lib/validations"
import CategorySelection from "./category-selection"

type BasicInfoSectionProps = {
   register: UseFormRegister<NewProductFormData>,
   control: Control<NewProductFormData, any, NewProductFormData>,
   errors: FieldErrors<NewProductFormData>
}
const BasicInfoSection = ({ register, control, errors }: BasicInfoSectionProps) => {
   return (
      <section className="space-y-8" id={"basic-info-section"}>
         <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
            <Label htmlFor="product-images" className="text-base font-normal pt-2">
               Hình ảnh sản phẩm
            </Label>
            <div>
               <div className="flex items-center gap-2 mb-4">
                  <Label htmlFor="image-ratio-1-1" className="text-base font-normal">
                     *Hình ảnh tỷ lệ 1:1
                  </Label>
               </div>
               <div className="flex flex-wrap gap-4 mb-4">
                  {Array.from({ length: 7 }).map((_, index) => (
                     <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden group">
                        <Image
                           src="/placeholder.svg?height=96&width=96"
                           alt={`Product image ${index + 1}`}
                           width={96}
                           height={96}
                           className="object-cover w-full h-full"
                        />
                        {index === 0 && (
                           <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1">
                              Ảnh bìa
                           </div>
                        )}
                        {index === 0 && (
                           <div className="absolute inset-0 border-2 border-red-500 rounded-md pointer-events-none" />
                        )}
                     </div>
                  ))}
               </div>
               <div className="flex items-center gap-2 text-sm">
                  <Checkbox id="image-ratio-3-4" />
                  <Label htmlFor="image-ratio-3-4" className="font-normal">
                     Hình ảnh tỷ lệ 3:4{" "}
                     <span className="text-muted-foreground">
                        Giúp sản phẩm thời trang thêm nổi bật với tỷ lệ hình ảnh 3:4
                     </span>
                  </Label>
                  <a href="#" className="text-blue-600 hover:underline">
                     Xem ví dụ
                  </a>
               </div>
            </div>
         </div>

         {/* Product Video Section */}
         <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
            <Label htmlFor="product-video" className="text-base font-normal pt-2">
               Video sản phẩm
            </Label>
            <div>
               <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
               >
                  <PlayCircle className="w-5 h-5 text-red-500" />
                  Thêm video
               </Button>
               <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Kích thước tối đa 30Mb, độ phân giải không vượt quá 1280x1280px</li>
                  <li>• Độ dài: 10s-60s</li>
                  <li>• Định dạng: MP4</li>
                  <li>
                     • Lưu ý: sản phẩm có thể hiển thị trong khi video đang được xử lý. Video sẽ tự động hiển thị sau khi
                     đã xử lý thành công
                  </li>
               </ul>
            </div>
         </div>

         {/* Product Name */}
         <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 items-center">
            <Label htmlFor="product-name" className="text-base font-normal">
               *Tên sản phẩm
            </Label>
            <div>
               <Input
                  id="product-name"
                  placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật"
                  {...register("name")}
               />
               {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
         </div>

         <CategorySelection control={control} errors={errors} />

         {/* Product Description */}
         <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
            <Label htmlFor="product-description" className="text-base font-normal">
               *Mô tả sản phẩm
            </Label>
            <div>
               <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2 px-3 py-2 mb-2 text-gray-600 hover:bg-gray-50 bg-transparent"
               >
                  <ImageIcon className="w-4 h-4" />
                  Tải lên hình ảnh (0/12)
               </Button>
               <Textarea
                  id="product-description"
                  placeholder="Nhập mô tả sản phẩm hoặc tải lên hình ảnh"
                  className="min-h-[120px]"
                  {...register("description")}
               />
               {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
               )}
            </div>
         </div>


      </section>
   )
}

export default BasicInfoSection