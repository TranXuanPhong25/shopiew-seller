import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { 
  VariantStore, 
  ProductOption, 
  Variant, 
  OptionValue, 
} from '@/stores/types/variant-store'
import { TriadState } from '@/components/ui/triad-checkbox'

// Helper function to generate unique IDs
let idCounter = 0
const generateUniqueId = () => {
  idCounter += 1
  return `${Date.now()}-${idCounter}`
}

const generateVariantCombinations = (options: ProductOption[]): Variant[] => {
  if (options.length === 0 || options.some(option => option.values.length === 0)) {
    return []
  }

  const combinations = options.reduce((acc, option) => {
    if (acc.length === 0) {
      return option.values.map(value => [{ name: option.name, value: value.value }])
    }
    
    const newCombinations: Array<Array<{ name: string; value: string }>> = []
    acc.forEach(combination => {
      option.values.forEach(value => {
        newCombinations.push([...combination, { name: option.name, value: value.value }])
      })
    })
    return newCombinations
  }, [] as Array<Array<{ name: string; value: string }>>)

  return combinations.map((combination, index) => ({
    id: `variant-${index}`,
    name: combination.map(item => item.value).join(' / '),
    price: '0',
    available: '0',
    selected: false,
    combination
  }))
}

export const useVariantStore = create<VariantStore>()(
  devtools(
    (set, get) => ({
      options: [],
      variants: [],
      setOptions: (options) => set({ options }),
      setVariants: (variants) => set({ variants }),

      generateVariants: (options) => generateVariantCombinations(options),

      updateVariants: (newOptions) => {
        const validOptions = newOptions.filter(option => 
          option.name.trim() !== '' && option.values.some(value => value.value.trim() !== '')
        )
        const newVariants = generateVariantCombinations(validOptions)
        set({ variants: newVariants })
      },

      addOption: () => {
        const newOption: ProductOption = {
          id: generateUniqueId(),
          name: "",
          values: [],
        }
        const newOptions = [...get().options, newOption]
        set({ options: newOptions })
        get().updateVariants(newOptions)
      },

      updateOptionName: (optionId, name) => {
        const newOptions = get().options.map((option) => 
          option.id === optionId ? { ...option, name } : option
        )
        set({ options: newOptions })
        get().updateVariants(newOptions)
      },

      deleteOption: (optionId) => {
        const newOptions = get().options.filter((option) => option.id !== optionId)
        set({ options: newOptions })
        get().updateVariants(newOptions)
      },

      addValue: (optionId) => {
        const newValue: OptionValue = {
          id: generateUniqueId(),
          value: "",
        }
        const newOptions = get().options.map((option) => 
          option.id === optionId 
            ? { ...option, values: [...option.values, newValue] } 
            : option
        )
        set({ options: newOptions })
        get().updateVariants(newOptions)
      },

      updateValue: (optionId, valueId, value) => {
        const newOptions = get().options.map((option) =>
          option.id === optionId
            ? {
                ...option,
                values: option.values.map((v) => (v.id === valueId ? { ...v, value } : v)),
              }
            : option,
        )
        set({ options: newOptions })
        get().updateVariants(newOptions)
      },

      deleteValue: (optionId, valueId) => {
        const newOptions = get().options.map((option) =>
          option.id === optionId 
            ? { ...option, values: option.values.filter((v) => v.id !== valueId) } 
            : option,
        )
        set({ options: newOptions })
        get().updateVariants(newOptions)
      },

      updateVariant: (variantId, field, value) => {
        const newVariants = get().variants.map((variant) => 
          variant.id === variantId ? { ...variant, [field]: value } : variant
        )
        set({ variants: newVariants })
      },

      toggleVariant: (variantId) => {
        const newVariants = get().variants.map((variant) => 
          variant.id === variantId ? { ...variant, selected: !variant.selected } : variant
        )
        set({ variants: newVariants })
      },
      selectAllVariants: () => {
        const newVariants = get().variants.map((variant) => ({ ...variant, selected: true }))
        set({ variants: newVariants })
      },
      deselectAllVariants: () => {
        const newVariants = get().variants.map((variant) => ({ ...variant, selected: false }))
        set({ variants: newVariants })
      },
      hasSelectedVariants: () => get().variants.some(variant => variant.selected),
      variantsSelectState: () => {
        const selectedCount = get().variants.filter(variant => variant.selected).length
        const totalCount = get().variants.length
        
        if (selectedCount === 0) {
          return TriadState.None
        } else if (selectedCount === totalCount) {
          return TriadState.All
        } else {
          return TriadState.Indeterminate
        }
      },
      onChangeVariantsSelect: (state: TriadState) => {
        if (state === TriadState.All) {
          get().selectAllVariants()
        } else if (state === TriadState.None) {
          get().deselectAllVariants()
        }
      },
      resetVariants: () => {
        set({ options: [], variants: [] })

      },
    }),
    {
      name: 'variant-store',
    }
  )
)
