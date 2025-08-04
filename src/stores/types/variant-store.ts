import { TriadState } from "@/components/ui/triad-checkbox"

export interface OptionValue {
  id: string
  value: string
}

export interface ProductOption {
  id: string
  name: string
  values: OptionValue[]
}

export interface Variant {
  id: string
  name: string
  price: string
  available: string
  selected: boolean
  combination?: Array<{ name: string; value: string }>
}


export interface VariantStoreActions {
  setOptions: (options: ProductOption[]) => void
  setVariants: (variants: Variant[]) => void
  addOption: () => void
  updateOptionName: (optionId: string, name: string) => void
  deleteOption: (optionId: string) => void
  addValue: (optionId: string) => void
  updateValueImmediate: (optionId: string, valueId: string, value: string) => void
  updateValue: (optionId: string, valueId: string, value: string) => void
  deleteValue: (optionId: string, valueId: string) => void
  updateVariant: (variantId: string, field: 'price' | 'available', value: string) => void
  toggleVariant: (variantId: string) => void
  generateVariants: (options: ProductOption[]) => Variant[]
  updateVariants: (newOptions: ProductOption[]) => void
  selectAllVariants: () => void
  deselectAllVariants: () => void
  hasSelectedVariants: () => boolean,
  onChangeVariantsSelect: (state: TriadState) => void
  variantsSelectState: () => TriadState
  resetVariants: () => void
}

export interface VariantStoreState {
  options: ProductOption[]
  variants: Variant[]
}
export type VariantStore = VariantStoreState & VariantStoreActions
