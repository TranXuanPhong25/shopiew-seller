"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { PlayCircle, ImageIcon } from "lucide-react"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import BasicInfoSection from "@/features/products/basic-info-section"
// Define the Zod schema for form validation
const formSchema = z.object({
  productName: z.string().min(1, { message: "Tên sản phẩm là bắt buộc." }),
  category: z.string().min(1, { message: "Ngành hàng là bắt buộc." }),
  productDescription: z.string().min(1, { message: "Mô tả sản phẩm là bắt buộc." }),
  // Add other fields if they become required later
})

type FormData = z.infer<typeof formSchema>

export default function NewProductForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      category: "",
      productDescription: "",
    },
  })

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    alert("Form submitted successfully! Check console for data.")
  }



  return (
    <>
      {/* Basic Info Section */}
      <div id="basic-info-section" className="pt-8">
        <h2 className="text-2xl font-bold mb-6">Thông tin cơ bản</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
          <BasicInfoSection
            register={register}
            control={control}
            errors={errors}
          />
          <section
            id="sales-info-section"
            className="pt-16 h-[700px] bg-gray-50 flex items-center justify-center border-t border-gray-200 mt-8"
          >
            <h3 className="text-xl text-gray-500">Thông tin bán hàng (Content will go here)</h3>
          </section>
          <section
            id="shipping-section"
            className="pt-16 h-[700px] bg-gray-100 flex items-center justify-center border-t border-gray-200 mt-8"
          >
            <h3 className="text-xl text-gray-500">Vận chuyển (Content will go here)</h3>
          </section>
          <section
            id="other-info-section"
            className="pt-16 h-[700px] bg-gray-50 flex items-center justify-center border-t border-gray-200 mt-8"
          >
            <h3 className="text-xl text-gray-500">Thông tin khác (Content will go here)</h3>
          </section>
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
              Lưu thông tin
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
