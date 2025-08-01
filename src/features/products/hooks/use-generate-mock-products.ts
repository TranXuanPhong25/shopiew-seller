import { useState } from "react";
import { ProductsService } from "@/features/products/service";
import { CreateProductData, Product } from "@/features/products/model";
import { toast } from "sonner";

type GenerateMockProductsOptions = {
  count: number;
  categoryId: number;
  includeImages: boolean;
  shopId: string;
};

type GenerateMockProductsResult = {
  success: boolean;
  count: number;
  products: Product[];
  errors?: Array<{
    index: number;
    error: string;
  }>;
};

export function useGenerateMockProducts() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [errors, setErrors] = useState<Array<{index: number; error: string}>>([]);
  const [progress, setProgress] = useState(0);

  const generateMockProducts = async (options: GenerateMockProductsOptions): Promise<GenerateMockProductsResult> => {
    const { count, categoryId, includeImages, shopId } = options;
    
    if (!shopId) {
      toast.error("Shop ID is required");
      return { success: false, count: 0, products: [], errors: [{ index: -1, error: "Shop ID is required" }] };
    }

    setIsGenerating(true);
    setResults([]);
    setErrors([]);
    setProgress(0);

    const createdProducts: Product[] = [];
    const creationErrors: Array<{index: number; error: string}> = [];

    try {
      // Generate and create products one by one
      for (let i = 0; i < count; i++) {
        try {
          const mockProductData = generateMockProduct(shopId, categoryId, includeImages);

          // Transform the mock data to match the expected CreateProductData structure
          const createProductData: CreateProductData = {
            product: mockProductData.product,
            variants: [
              {
                price: mockProductData.variant.price,
                stockQuantity: mockProductData.variant.stockQuantity,
                sku: mockProductData.variant.sku,
                images: mockProductData.variant.images ? mockProductData.variant.images.map(img => img.url) : [],
                attributes: mockProductData.variant.attributes
              }
            ],
            shippingInfo: {
              weightAfterPackaging: `${Math.floor(Math.random() * 1000) + 100}g`,
              dimensions: {
                width: `${Math.floor(Math.random() * 30) + 5}cm`,
                length: `${Math.floor(Math.random() * 30) + 5}cm`,
                height: `${Math.floor(Math.random() * 30) + 5}cm`
              }
            }
          };

          // Call the actual product service to create the product
          const createdProduct = await ProductsService.createProduct(createProductData);
          createdProducts.push(createdProduct);
          
          // Update state after each successful creation for better UX
          setResults(prev => [...prev, createdProduct]);
          setProgress(Math.round(((i + 1) / count) * 100));
          
          // Show toast for each product
          toast.success(`Created product ${i + 1}/${count}: ${mockProductData.product.name}`);
        } catch (err) {
          console.error(`Error creating product ${i + 1}:`, err);
          const errorInfo = {
            index: i,
            error: err instanceof Error ? err.message : 'Unknown error'
          };
          creationErrors.push(errorInfo);
          
          // Update errors state
          setErrors(prev => [...prev, errorInfo]);
          setProgress(Math.round(((i + 1) / count) * 100));
          
          // Show error toast
          toast.error(`Failed to create product ${i + 1}/${count}`);
        }
      }

      const result = {
        success: creationErrors.length === 0,
        count: createdProducts.length,
        products: createdProducts,
        errors: creationErrors.length > 0 ? creationErrors : undefined
      };
      
      return result;
    } catch (error) {
      console.error("Error generating mock products:", error);
      return {
        success: false,
        count: 0,
        products: [],
        errors: [{ index: -1, error: error instanceof Error ? error.message : "Unknown error" }]
      };
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateMockProducts,
    isGenerating,
    results,
    errors,
    progress,
    reset: () => {
      setResults([]);
      setErrors([]);
      setProgress(0);
    }
  };
}

function generateMockProduct(shopId: string, categoryId: number, includeImages: boolean) {
  // Generate random product name
  const productNames = [
    "Ultra Smart Phone",
    "Cozy Sweater",
    "Ergonomic Office Chair",
    "Luxury Face Cream",
    "Vitamin C Supplement",
    "Interactive Board Game",
    "Bestselling Novel",
    "Professional Tennis Racket"
  ];

  const brands = [
    "TechPro",
    "ComfortWear",
    "ErgoDesign",
    "LuxeSkin",
    "VitaWell",
    "GameMaster",
    "PageTurner",
    "SportElite"
  ];

  const descriptions = [
    "The latest technology with advanced features for the modern user.",
    "Comfortable and stylish for everyday wear in all seasons.",
    "Designed for maximum comfort during long work hours.",
    "Premium ingredients for youthful, glowing skin.",
    "High-quality supplements for optimal health and wellness.",
    "Hours of fun for the whole family with this engaging game.",
    "Captivating storytelling that will keep you turning pages.",
    "Professional-grade equipment for serious athletes."
  ];

  // Generate a random number for price between 10 and 1000
  const price = Math.floor(Math.random() * 990) + 10;

  // Get random product name and description based on category
  const randomIndex = (categoryId - 1) % 8;
  const name = productNames[randomIndex] + " " + Math.floor(Math.random() * 1000);
  const brand = brands[randomIndex];
  const description = descriptions[randomIndex];



  const statuses = ["ACTIVE", "DRAFT", "ARCHIVED"] as const;
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  const product = {
    shopId,
    name,
    categoryId,
    description,
    createdAt: new Date().toISOString(),
    specs: {
      brand,
      packageSize: Math.floor(Math.random() * 100).toString(),
      activeIngredients: "Active Compound " + Math.floor(Math.random() * 10),
      ingredients: "Ingredient A, Ingredient B, Ingredient C",
      quantity: Math.floor(Math.random() * 100).toString(),
      responsibleManufacturingAddress: "123 Factory St, Manufacturing City, MC 12345",
      weightValue: Math.floor(Math.random() * 100).toString(),
      weightUnit: ["g", "kg", "ml", "l"][Math.floor(Math.random() * 4)],
      packagingType: ["Type A", "Type B", "Type C"][Math.floor(Math.random() * 3)],
      productSize: ["Small", "Medium", "Large"][Math.floor(Math.random() * 3)],
      packagingMaterial: ["Plastic", "Paper", "Glass"][Math.floor(Math.random() * 3)]
    },
    status: randomStatus,
  };
  // Generate random ID (UUID-like format)
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  const variant = {
    id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }),
    price,
    stockQuantity: Math.floor(Math.random() * 1000) + 10,
    sku: "SKU" + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
    images: includeImages
      ? Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
        url: `https://picsum.photos/seed/${uuid}-${i}/640/480`,
        alt: `Image of ${name}`
      }))
      : [],
    attributes: {
      color: ["Red", "Blue", "Green", "Black", "White"][Math.floor(Math.random() * 5)],
      size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
    }
  };

  return {
    product,
    variant
  };
}
