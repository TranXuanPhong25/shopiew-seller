import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ProductMediaStore } from './types/product-media-store'

const useProductMediaStore = create<ProductMediaStore>()(
   devtools(
      (set, get) => ({
         images: [],
         setImages: (images) => set({ images }),
         addImage: (image) => {
            const newImage = {
               ...image,
               id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
            }
            set((state) => ({ images: [...state.images, newImage] }))
         },
         removeImage: (imageId) => set((state) => ({ images: state.images.filter((img) => img.id !== imageId) }))
      }))
)
export default useProductMediaStore