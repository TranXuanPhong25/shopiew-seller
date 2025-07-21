"use client"
import { Button } from "@/components/ui/button"
import {  TriangleAlert, X } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import BasicInfoSection from "./basic-info-section"
import { toast } from "sonner"
import FloatingNotificationBar from "@/features/notifications/floating-notification-bar"
import { useCreateProduct } from "../../hook"
import { ErrorResponse } from "@/types/ErrorResponse"
import { NewProductFormData, NewProductFormSchema } from "@/lib/validations"



export default function NewProductForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<NewProductFormData>({
    resolver: zodResolver(NewProductFormSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
    },
  })

  const {isCreating, createProduct } = useCreateProduct()

  const onSubmit = async (data: NewProductFormData) => {
    await createProduct({
      product: {
        name: data.name,
        categoryId: parseInt(data.category.split("-")[0]), // Assuming category is a string that can be parsed to a number
        description: data.description,
      },
      variants: [
        {  
          price: 3600000, // Default price, can be changed later
          stockQuantity: 100, // Default stock quantity, can be changed later
          images: [], // Assuming no images for now, can be extended later
          // sku: "v", // Assuming no SKU for now, can be extended later
          attributes: {}, // Assuming no attributes for now, can be extended later
        }
      ], // Assuming no variants for now, can be extended later
    },{
      onError: (error:unknown) => {
        const err = error as ErrorResponse;
        toast.error(`Error creating product`, {
          description: err.detail,
        })
      },
      onSuccess: () => {
        toast.success("Product created successfully!")
        reset()
      },
    }
  )
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
