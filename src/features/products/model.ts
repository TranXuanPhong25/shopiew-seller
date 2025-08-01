export type Product = {
   shopId: string
   id: string
   name: string
   categoryId: number
   description: string
   createdAt?: string
   brand?: Brand
   updatedAt?: string
   specs?: Record<string, string | number | boolean>
   status?: "ACTIVE" | "DRAFT" | "ARCHIVED"
}

export type Brand = {
   id: string
   name?: string
   description?: string
   logo?: string
}
export type ProductVariant = {
   id?: string
   price: number
   stockQuantity: number
   images?: string[]
   sku?: string
   attributes?: Record<string, string|number | boolean>
}

export type CreateProductData = {
   product: Product
   variants: ProductVariant[]
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