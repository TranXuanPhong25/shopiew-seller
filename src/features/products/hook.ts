import { useMutation } from "@tanstack/react-query";
import { CreateProductData, UploadImageResponse } from "./model";
import { ProductsService, UploadService } from "./service";
import { useVariantStore } from "@/stores/variant-store";
import { MediaItem } from "@/stores/types/product-media-store";
import useProductMediaStore from "@/stores/product-media-store";

const useCreateProduct = () => {
   const { getSelectedVariantsHasImage } = useVariantStore();
   const { images } = useProductMediaStore();
   const { uploadImages } = useUploadImages();
   const { mutateAsync, isPending, isError, error } = useMutation({
      mutationKey: ["createProduct"],
      mutationFn: async (data: CreateProductData) => {
         try {
            const product = await ProductsService.createDraftProduct(data);
            const productId = product?.id;
            const productImages = images.map(image => ({
               id: image.id,
               file: image.file
            }));
            const selectedVariantHasImage = getSelectedVariantsHasImage();
            const uploadedProductImages = await Promise.all(productImages.map(image => uploadImages(image)));
            product.images = uploadedProductImages.map(uploaded => uploaded.resource);
            let updatedVariants = product.variants || [];
            if (product.variants) {
               const variantImages = selectedVariantHasImage.flatMap(variant => variant.images || []);
               const uploadedVariantImages = await Promise.all(variantImages.map(image => uploadImages({ id: image.id, file: image.file })));
               updatedVariants = product.variants.map(variant => {
                  const matchedVariant = selectedVariantHasImage
                  .find(variantInStore => 
                     variantInStore.name == Object.values(variant.attributes||{}).join('/')
                  );
                  return {
                     ...variant,
                     images: uploadedVariantImages
                     .map(uploaded => uploaded.resource)
                     .filter(url => matchedVariant?.images?.some(image => url.includes(image.id + "_" + image.file.name)))
                  };
               });
            }
            const updatedProduct = await ProductsService.updateProductById(productId, {
               product: {
                  ...product,
               },
               variants: updatedVariants
            });
            return updatedProduct;
         } catch (error) {
            throw error; // Re-throw to handle it in the component
         }
      },
   });

   return { createProduct: mutateAsync, isCreating: isPending, isError, error };
}
const useUploadImages = () => {
   const { mutateAsync, isPending, isError, error } = useMutation({
      mutationKey: ["uploadImages"],
      mutationFn: async (data: MediaItem): Promise<UploadImageResponse> => {
         try {
            const fileName = data.id + "_" + data.file.name;
            const {
               presignedUrl,
               resource
            } = await UploadService.generatePresignedUrl(data.file, fileName);
            await UploadService.upload(data.file, presignedUrl);
            return {
               presignedUrl,
               fileName,
               resource
            };
         } catch (error) {
            throw error;
         }
      },
   });

   return { uploadImages: mutateAsync, isUploading: isPending, isError, error };
};

export {
   useCreateProduct,
};