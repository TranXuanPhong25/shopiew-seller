export interface ProductMediaStoreActions {
   setImages: (images: MediaItem[]) => void;
   addImage: (image: MediaItem) => void;
   removeImage: (imageId: string) => void;
}

export type MediaItem = {
  id: string;
  url?: string;
  file: File;
//   name?: string;
}

export interface ProductMediaStoreState {
   images: MediaItem[];
   setImages: (images: MediaItem[]) => void;
   addImage: (image: MediaItem) => void;
   removeImage: (imageId: string) => void;
}
export type ProductMediaStore = ProductMediaStoreState & ProductMediaStoreActions