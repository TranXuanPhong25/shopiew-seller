import { NextRequest, NextResponse } from "next/server";
import { ProductsService } from "@/features/products/service";
import { CreateProductData } from "@/features/products/model";

export async function POST(req: NextRequest) {
   try {
      const { count = 5, category: categoryId = 1, includeImages = true, shopId } = await req.json();
      console.log("Generating mock products:", { count, categoryId, includeImages, shopId });
      if (!shopId) {
         return NextResponse.json(
            { error: "Shop ID is required" },
            { status: 400 }
         );
      }

      const results = [];
      const errors = [];

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
            results.push(createdProduct);
         } catch (err) {
            console.error(`Error creating product ${i + 1}:`, err);
            errors.push({
               index: i,
               error: err instanceof Error ? err.message : 'Unknown error'
            });
         }
      }

      return NextResponse.json({
         success: errors.length === 0,
         count: results.length,
         products: results,
         errors: errors.length > 0 ? errors : undefined
      });

   } catch (error) {
      console.error("Error generating mock products:", error);
      return NextResponse.json(
         { error: "Failed to generate mock products" },
         { status: 500 }
      );
   }
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

   // Generate random ID (UUID-like format)
   const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   });

   const statuses = ["ACTIVE", "DRAFT", "ARCHIVED"] as const;
   const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

   const product = {
      id,
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

   const variant = {
      id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
         const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
         return v.toString(16);
      }),
      productId: product.id,
      price,
      stockQuantity: Math.floor(Math.random() * 1000) + 10,
      sku: "SKU" + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
      images: includeImages
         ? Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
            url: `https://picsum.photos/seed/${product.id}-${i}/640/480`,
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
