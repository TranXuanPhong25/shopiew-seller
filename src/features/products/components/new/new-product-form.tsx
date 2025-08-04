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
import { useVariantStore } from "@/stores/variant-store"
import { useVariantFormIntegration } from "../../hooks/use-variant-form"
import { useEffect } from "react"

export default function NewProductForm() {
  const { shop, loading } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    getValues,
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
      // Add variants field to form
    },
  })
  const { createProduct } = useCreateProduct()
  const {
    getSelectedVariantsForSubmission,
    hasSelectedVariants,
    resetAllVariants
  } = useVariantFormIntegration()
  const onSubmit = async (data: NewProductFormData) => {
    if (!shop?.id) {
      return;
    }

    // Get selected variants from store using the hook
    const selectedVariants = getSelectedVariantsForSubmission()
    await createProduct({
      product: {
        shopId: shop?.id,
        name: data.name,
        categoryId: parseInt(data.category.split("-")[0]),
        description: data.description,
        brand: {
          id: "1",
        },
        specs: {
          ...data.specs,
          packageSize: data.specs.packageSize ? String(data.specs.packageSize) : "",
        },
        status: data.status,
      },
      variants: selectedVariants,
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
        handleReset()
      },
    })
  }

  const handleReset = () => {
    reset()
    resetAllVariants() // Reset variant store when discarding changes
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
          <FloatingNotificationBar isExpanded={isDirty || hasSelectedVariants()}>
            <div className="flex items-center justify-between w-full">
              <span className="font-semibold flex items-center ml-4">
                <TriangleAlert className="size-5 mr-2" />
                <span className="text-base line-clamp-1">Unsaved product</span>
              </span>
              <span className="flex items-center rounded-full bg-gray-700 text-sm mr-1 h-fit justify-center p-1 gap-1">
                <Button
                  className="bg-green-500 hover:bg-green-500/90 rounded-full px-3 py-1 h-fit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </Button>
                <Button
                  className="bg-transparent hover:bg-red-500 rounded-full px-3 py-1 h-fit"
                  onClick={handleReset}
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
