export type Product = {
   id?: string
   name: string
   categoryId: number
   description: string
}
export type ProductVariant ={
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