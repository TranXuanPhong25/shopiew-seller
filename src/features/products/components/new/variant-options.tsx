"use client"

import { useState } from "react"
import { Plus, GripVertical, Trash2, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface OptionValue {
  id: string
  value: string
}

interface ProductOption {
  id: string
  name: string
  values: OptionValue[]
}

interface Variant {
  id: string
  name: string
  price: string
  available: string
  selected: boolean
}

export default function VariantOptions() {
  const [options, setOptions] = useState<ProductOption[]>([
    {
      id: "1",
      name: "sdj",
      values: [
        { id: "v1", value: "sgf" },
        { id: "v2", value: "sf" },
        { id: "v3", value: "d" },
        { id: "v4", value: "sfg" },
      ],
    },
  ])

  const [variants, setVariants] = useState<Variant[]>([
    { id: "1", name: "sgf", price: "0", available: "0", selected: false },
    { id: "2", name: "sf", price: "0", available: "0", selected: false },
    { id: "3", name: "d", price: "0", available: "0", selected: false },
    { id: "4", name: "sfg", price: "0", available: "0", selected: false },
  ])

  const addOption = () => {
    const newOption: ProductOption = {
      id: Date.now().toString(),
      name: "",
      values: [],
    }
    setOptions([...options, newOption])
  }

  const updateOptionName = (optionId: string, name: string) => {
    setOptions(options.map((option) => (option.id === optionId ? { ...option, name } : option)))
  }

  const addValue = (optionId: string) => {
    const newValue: OptionValue = {
      id: Date.now().toString(),
      value: "",
    }
    setOptions(
      options.map((option) => (option.id === optionId ? { ...option, values: [...option.values, newValue] } : option)),
    )
  }

  const updateValue = (optionId: string, valueId: string, value: string) => {
    setOptions(
      options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              values: option.values.map((v) => (v.id === valueId ? { ...v, value } : v)),
            }
          : option,
      ),
    )
  }

  const deleteValue = (optionId: string, valueId: string) => {
    setOptions(
      options.map((option) =>
        option.id === optionId ? { ...option, values: option.values.filter((v) => v.id !== valueId) } : option,
      ),
    )
  }

  const deleteOption = (optionId: string) => {
    setOptions(options.filter((option) => option.id !== optionId))
  }

  const updateVariant = (variantId: string, field: "price" | "available", value: string) => {
    setVariants(variants.map((variant) => (variant.id === variantId ? { ...variant, [field]: value } : variant)))
  }

  const toggleVariant = (variantId: string) => {
    setVariants(
      variants.map((variant) => (variant.id === variantId ? { ...variant, selected: !variant.selected } : variant)),
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Variants</h2>

          {options.map((option) => (
            <div key={option.id} className="space-y-4">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700">Option name</Label>
                  <Input
                    value={option.name}
                    onChange={(e) => updateOptionName(option.id, e.target.value)}
                    className="mt-1"
                    placeholder="Enter option name"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Option values</Label>
                <div className="mt-2 space-y-2">
                  {option.values.map((value) => (
                    <div key={value.id} className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <Input
                        value={value.value}
                        onChange={(e) => updateValue(option.id, value.id, e.target.value)}
                        className="flex-1"
                        placeholder="Enter value"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteValue(option.id, value.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={() => addValue(option.id)}
                    className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Add another value
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="ghost"
                  onClick={() => deleteOption(option.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 px-0"
                >
                  Delete
                </Button>
                <Button className="bg-gray-800 hover:bg-gray-900 text-white px-6">Done</Button>
              </div>
            </div>
          ))}

          <Button
            variant="ghost"
            onClick={addOption}
            className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100 py-3 mt-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add another option
          </Button>
        </div>

        {/* Variants Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Checkbox />
              <span className="font-medium">Variant</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-700">Variant</th>
                  <th className="text-left p-4 font-medium text-gray-700">Price</th>
                  <th className="text-left p-4 font-medium text-gray-700">Available</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((variant) => (
                  <tr key={variant.id} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Checkbox checked={variant.selected} onCheckedChange={() => toggleVariant(variant.id)} />
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-blue-600 rounded"></div>
                        </div>
                        <span>{variant.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">d</span>
                        <Input
                          value={variant.price}
                          onChange={(e) => updateVariant(variant.id, "price", e.target.value)}
                          className="w-20"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <Input
                        value={variant.available}
                        onChange={(e) => updateVariant(variant.id, "available", e.target.value)}
                        className="w-20"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t bg-gray-50 text-center text-sm text-gray-600">
            Total inventory at Shop location: 0 available
          </div>
        </div>
      </div>
    </div>
  )
}
