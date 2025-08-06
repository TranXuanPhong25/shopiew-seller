export type RawProduct = {
   shopId: string
   name: string
   categoryId: number
   description: string
   brand?: Brand
   specs?: Record<string, string | number | boolean>
   status?: "ACTIVE" | "DRAFT" | "ARCHIVED"
}

export type Product = RawProduct & {
   id: string
   createdAt: string
   updatedAt: string
}
export type Brand = {
   id: string
   name?: string
   description?: string
   logo?: string
}

export type RawProductVariant = {
   price: string
   stockQuantity: string
   images?: string[]
   sku?: string
   attributes?: Record<string, string | number | boolean>
}


export type ProductVariant = RawProductVariant & {
   id: string
}

export type CreateProductData = {
   product: RawProduct
   variants: RawProductVariant[]
   shippingInfo?: {
      weightAfterPackaging?: string
      dimensions?: {
         width?: string
         length?: string
         height?: string
      }
   }
}

export type GetProductResponse = {
   content: Product[]
   pageNumber: number
   pageSize: number
   totalElements: number
   totalPages: number
}