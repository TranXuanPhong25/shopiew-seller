import { useVariantStore } from '@/stores/variant-store'

import { RawProductVariant } from '../model'

export const useVariantFormIntegration = () => {
  const { variants, resetVariants , hasSelectedVariants } = useVariantStore()

  const getSelectedVariantsForSubmission = (): RawProductVariant[] => {
    return variants
      .filter(variant => variant.selected)
      .map(variant => ({
        name: variant.name,
        price: variant.price ? Number(variant.price) : 0,
        sku: variant.sku || "",
        stockQuantity: variant.available ? Number(variant.available) : 0,
        attributes: variant.combination?.reduce((obj, item) => ({ ...obj, [item.name]: item.value }), {}) || {},
      }))
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
