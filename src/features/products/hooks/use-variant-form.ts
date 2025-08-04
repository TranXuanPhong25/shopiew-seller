import { useVariantStore } from '@/stores/variant-store'
import { useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { NewProductFormData } from '@/lib/validations'
import { ProductVariant, RawProductVariant } from '../model'

export const useVariantFormIntegration = (setValue: UseFormSetValue<NewProductFormData>) => {
  const { variants, resetVariants } = useVariantStore()

  const getSelectedVariantsForSubmission = (): RawProductVariant[] => {
    return variants
      .filter(variant => variant.selected)
      .map(variant => ({
        name: variant.name,
        price: parseFloat(variant.price) || 0,
        stockQuantity: parseInt(variant.available) || 0,
        attributes: variant.combination?.reduce((obj, item) => ({ ...obj, [item.name]: item.value }), {}) || {},
      }))
  }

  const hasSelectedVariants = () => {
    return variants.some(variant => variant.selected)
  }

  const resetAllVariants = () => {
    resetVariants()
  }

  return {
    variants,
    getSelectedVariantsForSubmission,
    hasSelectedVariants,
    resetAllVariants,
  }
}
