"use client"
import { Button } from "@/components/ui/button"
import { TriangleAlert, X } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Skeleton } from "@/components/ui/skeleton"



export default function NewProductForm() {
  const { shop,loading } = useAuth();
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
      description: "<p></p>",
      specs: {
        brand: "",
        packageSize: "",
        activeIngredients: "",
        ingredients: "",
        quantity: "",
        responsibleManufacturingAddress: "",
        weightValue: "",
        weightUnit: "g",
        packagingType: "Type A",
        productSize: "",
        packagingMaterial: "",
      },
      price: "",
      stockQuantity: "",
      maxPurchaseQuantity: "",
      status: "ACTIVE",
      isNew: "New",
      shippingInfo: {
        weightAfterPackaging: "",
        dimensions: {
          width: "",
          length: "",
          height: "",
        },
      },
    },
  })
  const { createProduct } = useCreateProduct()

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
        brand: {
          id: "1", // Assuming brand is a string that can be used as an ID
        },
        createdAt: new Date().toISOString(),
        specs: {
          ...data.specs, // Assuming specs is an object with the necessary fields
          packageSize: data.specs.packageSize ? String(data.specs.packageSize) : "", // Ensure packageSize is a string
        },
        status: data.status, // Ensure status is in the correct format
      },
      variants: [
        // {
        // price: 4444,
        // stockQuantity: 100, // Default stock quantity, can be changed later
        // images: [], // Assuming no images for now, can be extended later
        // // sku: "v", // Assuming no SKU for now, can be extended later
        // attributes: {}, // Assuming no attributes for now, can be extended later
        // }
      ], // Assuming no variants for now, can be extended later
      shippingInfo: {
        ...data.shippingInfo
      },
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
      {loading ? (
        <div className="space-y-8">
          {/* Skeleton for BasicInfoSection */}
          <div className="p-6 bg-white rounded-lg shadow-sm max-w-5xl mx-auto">
            <Skeleton className="h-8 w-1/3 mb-6" />
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </div>
          
          {/* Skeleton for ProductDetailsForm */}
          <div className="p-6 bg-white rounded-lg shadow-sm max-w-5xl mx-auto">
            <Skeleton className="h-8 w-1/4 mb-6" />
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Skeleton for SalesInfoSection */}
          <div className="p-6 bg-white rounded-lg shadow-sm max-w-5xl mx-auto">
            <Skeleton className="h-8 w-1/4 mb-6" />
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Basic Info Section */
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
      )}
    </>
  )
}
