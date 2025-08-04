"use client"

import { Plus, GripVertical, Trash2, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useVariantStore } from "@/stores/variant-store"

export default function VariantOptions() {
  const {
    options,
    variants,
    addOption,
    updateOptionName,
    deleteOption,
    addValue,
    updateValue,
    deleteValue,
    updateVariant,
    toggleVariant,
  } = useVariantStore()

  return (
    <>
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
                        type="button"
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
                    type="button"

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
                  type="button"
                  variant="ghost"
                  onClick={() => deleteOption(option.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 px-0"
                >
                  Delete
                </Button>
                <Button type="button" className="bg-gray-800 hover:bg-gray-900 text-white px-6">Done</Button>
              </div>
            </div>
          ))}

          <Button
            variant="ghost"
            onClick={addOption}
            type="button"
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
              <Button variant="ghost" size="sm" type="button">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" type="button">
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
                        <span className="text-gray-500 mr-1">$</span>
                        <Input
                          value={variant.price}
                          onChange={(e) => updateVariant(variant.id, "price", e.target.value)}
                          className="w-20"
                          placeholder="0.00"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <Input
                        value={variant.available}
                        onChange={(e) => updateVariant(variant.id, "available", e.target.value)}
                        className="w-20"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t bg-gray-50 text-center text-sm text-gray-600">
            Total inventory at Shop location: {variants.reduce((total, variant) => total + parseInt(variant.available || '0'), 0)} available
          </div>
        </div>
      </div>
    </>
  )
}
