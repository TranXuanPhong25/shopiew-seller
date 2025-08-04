import { useVariantStore } from '@/stores/variant-store'

import { RawProductVariant } from '../model'

export const useVariantFormIntegration = () => {
  const { variants, resetVariants , hasSelectedVariants } = useVariantStore()

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
