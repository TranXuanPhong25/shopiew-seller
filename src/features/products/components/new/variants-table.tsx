"use client"

import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { TriadCheckbox } from "@/components/ui/triad-checkbox"
import { useVariantStore } from "@/stores/variant-store"

export default function VariantsTable() {
   const {
      variants,
      updateVariant,
      toggleVariant,
      variantsSelectState,
      onChangeVariantsSelect,
   } = useVariantStore()

   return (
      <div className="bg-white rounded-lg shadow-sm border">
         <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
               <TriadCheckbox state={variantsSelectState()} onStateChange={onChangeVariantsSelect} />
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
                                 +
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
   )
}
