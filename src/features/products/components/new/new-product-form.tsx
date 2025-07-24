"use client"
import { Button } from "@/components/ui/button"
import { TriangleAlert, X } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import BasicInfoSection from "./basic-info-section"
import { toast } from "sonner"
import FloatingNotificationBar from "@/features/notifications/floating-notification-bar"
import { useCreateProduct } from "../../hook"
import { ErrorResponse } from "@/types/ErrorResponse"
import { NewProductFormData, NewProductFormSchema } from "@/lib/validations"
import { useAuth } from "@/features/auth/hook"
import ProductDetailsForm from "./product-details-form"
import SalesInfoSection from "./sales-info-section"
import PublishCardForm from "./publish-card-form"
import ShippingSection from "./shipping-section"
import OthersInfoSection from "./others-info-section"



export default function NewProductForm() {
  const { shop } = useAuth();
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
      brand: "Weilaiya",
      packageSize: "",
      activeIngredients: "Anti-oxidants",
      ingredients: "",
      quantity: "100",
      responsibleManufacturingAddress: "",
      weightValue: "50",
      weightUnit: "g",
      packagingType: "Type A",
      productSize: "",
      packagingMaterial: "",
      price: "3600000",
      stockQuantity: "100",
      maxPurchaseQuantity: "",
      status: "active",
      isNew: "New",
    },
  })

  const { isCreating, createProduct } = useCreateProduct()

  const onSubmit = async (data: NewProductFormData) => {
    if (!shop?.id) {
      return;
    }
    await createProduct({
      product: {
        id: "",
        shopId: shop?.id, // Ensure shop_id is set
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
    }, {
      onError: (error: unknown) => {
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
      <div className="relative">
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

        <form onSubmit={handleSubmit(onSubmit)} className=" space-x-4 relative flex">
          <div>
            <BasicInfoSection
              register={register}
              control={control}
              errors={errors}
              isDirty={isDirty}
            />
            <ProductDetailsForm
              control={control}
              errors={errors}
              isDirty={isDirty}
            />
            <SalesInfoSection
              register={register}
              control={control}
              errors={errors}
            />
           <ShippingSection
              register={register}
              control={control}
              errors={errors}
            />
            <OthersInfoSection
              register={register}
              control={control}
              errors={errors}
            />
          </div>
          <PublishCardForm 
            register={register}
            control={control}
            errors={errors}
          />
        </form>
      </div>
    </>
  )
}
