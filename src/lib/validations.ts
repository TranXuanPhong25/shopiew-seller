import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
})

export const SignupFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
})
export const NewProductFormSchema = z.object({
  name: z.string().min(1, { message: "Product's name is required" }),
  category: z.string().nonempty({ message: "Product's category is required." }),
  description: z.string().min(1, { message: "Product's description is required." }),
  brand: z.string().min(1, { message: "Thương hiệu không được để trống." }),
  packageSize: z.string().regex(/^\d+$/, { message: "Kích cỡ gói phải là số." }),
  activeIngredients: z.string().optional(), // Simplified for now, would be a multi-select/tag input
  ingredients: z.string().optional(),
  quantity: z.string().regex(/^\d+$/, { message: "Số lượng phải là số." }),
  responsibleManufacturingAddress: z.string().optional(), // Simplified for now, would be a multi-select
  weightValue: z.string().regex(/^\d+(\.\d+)?$/, { message: "Trọng lượng phải là số." }),
  weightUnit: z.enum(["g", "kg", "ml", "l"]), // Example units
  packagingType: z.string().optional(),
  productSize: z.string().optional(),
  packagingMaterial: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d+)?$/, { message: "Giá phải là số." }),
  stockQuantity: z.string().regex(/^\d+$/, { message: "Kho hàng phải là số." }),
  maxPurchaseQuantity: z.string().optional(),
  status: z.enum(["active", "draft", "archived"]).default("active").optional(),
  isNew: z.string().optional(), // Assuming this is a select input for new products
})

export type NewProductFormData = z.infer<typeof NewProductFormSchema>

export type LoginFormState =
  | {
    errors?: {
      email?: string[]
      password?: string[]
    }
    message?: string
  }
  | undefined

export type SignupFormState =
  | {
    errors?: {
      email?: string[]
      password?: string[]
    }
    message?: string
  }
  | undefined
