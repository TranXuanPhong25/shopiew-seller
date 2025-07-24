import { InputWithUnit } from "@/components/form/input-with-unit"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NewProductFormData } from "@/lib/validations"
import { Control, FieldErrors, UseFormRegister } from "react-hook-form"

type ShippingSectionProps = {
   register: UseFormRegister<NewProductFormData>
   control: Control<NewProductFormData, any, NewProductFormData>
   errors: FieldErrors<NewProductFormData>
}

export default function ShippingSection({ register, control, errors }: ShippingSectionProps) {
   return (
      <section
         id="shipping-section"
         className=" mt-8 space-y-8 p-6 bg-white rounded-lg shadow-sm max-w-5xl mx-auto">
         <h2 className="text-2xl font-bold mb-2">Thông tin vận chuyển</h2>
         <div>
            <InputWithUnit 
               placeholder="Nhập trọng lượng sản phẩm"
               unit="kg"
            />
            <div className="space-y-2">
               <Label htmlFor="dimensions-r" className="text-base font-normal text-gray-700">
                  Kích thước đóng gói
               </Label>
               <p className="text-sm text-gray-500">(Phí vận chuyển thực tế sẽ thay đổi nếu bạn nhập sai kích thước)</p>
               <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
                  <div className="flex items-center gap-2">
                     <Input id="dimensions-r" placeholder="R" className="flex-1" />
                     <span className="text-gray-500">cm</span>
                  </div>
                  <span className="text-gray-400 text-xl font-light">x</span>
                  <div className="flex items-center gap-2">
                     <Input id="dimensions-d" placeholder="D" className="flex-1" />
                     <span className="text-gray-500">cm</span>
                  </div>
                  <span className="text-gray-400 text-xl font-light">x</span>
                  <div className="flex items-center gap-2">
                     <Input id="dimensions-c" placeholder="C" className="flex-1" />
                     <span className="text-gray-500">cm</span>
                  </div>
               </div>
            </div>

         </div>
      </section>
   )
}