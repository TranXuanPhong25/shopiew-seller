"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { PlayCircle, ImageIcon, PlusCircle, CircleCheck, TriangleAlert, X } from "lucide-react"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import BasicInfoSection from "@/features/products/new/basic-info-section"
import { toast } from "sonner"
import FloatingNotificationBar from "@/features/notifications/floating-notification-bar"
import { useEffect, useState } from "react"
// Define the Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Tên sản phẩm là bắt buộc." }),
  category: z.string().min(1, { message: "Ngành hàng là bắt buộc." }),
  description: z.string().min(1, { message: "Mô tả sản phẩm là bắt buộc." }),
  // Add other fields if they become required later
})

export type NewProductFormData = z.infer<typeof formSchema>

export default function NewProductForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<NewProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
    },

  })

  const onSubmit = (data: NewProductFormData) => {
    toast.info("Form submitted:", {
      description: JSON.stringify(data, null, 2),

    })
  }


  return (
    <>
      {/* Basic Info Section */}
      <div className="pt-8 relative">
        <FloatingNotificationBar isExpanded={isDirty} >
          <div className="flex items-center  justify-between w-full">

            <span className="font-semibold flex items-center ml-4">
              <TriangleAlert className="size-5 mr-2" />
              <span className="text-base line-clamp-1">Unsaved product</span>
            </span>
            <span className="flex items-center rounded-full bg-gray-700    text-sm mr-1 h-fit justify-center p-1 gap-1">
              <Button
                className=" bg-green-500 hover:bg-green-500/90 rounded-full px-3 py-1 h-fit"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
              <Button
                className=" bg-transparent hover:bg-red-500 rounded-full px-3 py-1 h-fit"
                onClick={() => reset()}
              >
                Discard
              </Button>
            </span>
          </div>
        </FloatingNotificationBar>
        <h2 className="text-2xl font-bold mb-6 ">Thông tin cơ bản</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 relative">
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
          <Button type="submit" className="px-6 py-2 text-white rounded-md float-right">
            Lưu thông tin
          </Button>
        </form>
      </div>
    </>
  )
}
