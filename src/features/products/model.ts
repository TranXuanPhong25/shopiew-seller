export type Product = {
   shopId: string
   id: string
   name: string
   categoryId: number
   description: string
   createdAt?: string
   updatedAt?: string
}
export type ProductVariant = {
   id?: string
   price: number
   stockQuantity: number
   images?: string[]
   sku?: string
   attributes?: Record<string, string>
}

export type CreateProductData = {
   product: Product
   variants: ProductVariant[]
}

export type GetProductResponse = {
   content: Product[]
   pageNumber: number
   pageSize: number
   totalElements: number
   totalPages: number
}