'use client';

import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { X, Upload, Camera } from 'lucide-react';

interface ImageUploadProps {
   onImageChange?: (file: File | null) => void;
   onImageUrlChange?: (url: string | null) => void;
   maxSizeMB?: number;
   className?: string;
   disabled?: boolean;
   size?: number;
}

const ImageUpload = ({
   onImageChange,
   onImageUrlChange,
   maxSizeMB = 5,
   className,
   disabled = false,
   size = 100
}: ImageUploadProps) => {
   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
   const [isDragOver, setIsDragOver] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const validateFile = useCallback((file: File): string | null => {
      // Check file type
      if (!file.type.startsWith('image/')) {
         return 'Please select an image file';
      }

      // Check file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
         return `File size must be less than ${maxSizeMB}MB`;
      }

      // Check image dimensions (optional)
      return null;
   }, [maxSizeMB]);

   const handleFileSelect = useCallback(async (file: File) => {
      setError(null);
      setIsLoading(true);

      const validationError = validateFile(file);
      if (validationError) {
         setError(validationError);
         setIsLoading(false);
         return;
      }

      try {
         // Create preview URL
         const url = URL.createObjectURL(file);
         setPreviewUrl(url);

         // Call callbacks
         onImageChange?.(file);
         onImageUrlChange?.(url);
      } catch (err) {
         setError('Failed to process image');
      } finally {
         setIsLoading(false);
      }
   }, [validateFile, onImageChange, onImageUrlChange]);

   const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         handleFileSelect(file);
      }
   }, [handleFileSelect]);

   const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
         setIsDragOver(true);
      }
   }, [disabled]);

   const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
   }, []);

   const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));

      if (imageFiles.length > 0) {
         handleFileSelect(imageFiles[0]);
      }
   }, [disabled, handleFileSelect]);

   const handleRemoveImage = useCallback(() => {
      if (previewUrl) {
         URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setError(null);
      onImageChange?.(null);
      onImageUrlChange?.(null);

      // Clear file input
      if (fileInputRef.current) {
         fileInputRef.current.value = '';
      }
   }, [previewUrl, onImageChange, onImageUrlChange]);

   const handleClick = useCallback(() => {
      if (!disabled) {
         fileInputRef.current?.click();
      }
   }, [disabled]);

   return (
      <div className={cn("space-y-2", className)}>
         <Card
            className={cn(
               "relative overflow-hidden cursor-pointer transition-all duration-200",
               "border-2 border-dashed border-gray-300 hover:border-gray-400",
               "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
               isDragOver && "border-primary bg-primary/5",
               disabled && "cursor-not-allowed opacity-50",
               previewUrl && "border-solid border-gray-200"
            )}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
         >
            <div className={`aspect-square relative size-[${size}px] flex items-center justify-center`}>
               {isLoading ? (
                  <div className="flex flex-col items-center space-y-2">
                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                     <p className="text-sm text-gray-500">Uploading...</p>
                  </div>
               ) : previewUrl ? (
                  <>
                     <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-fit"
                        sizes="(max-width: 768px) 100px, (max-width: 1200px) 50px, 100px"
                     />
                     <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-8 w-8 rounded-full"
                        onClick={(e) => {
                           e.stopPropagation();
                           handleRemoveImage();
                        }}
                     >
                        <X className="h-4 w-4" />
                     </Button>
                  </>
               ) : (
                     <div className="mx-auto  text-gray-400">
                        {isDragOver ? (
                           <Upload className="h-full w-full " />
                        ) : (
                           <Image
                              src="/add-photo-placeholder.jpg"
                              alt="Upload Icon"
                              width={100}
                              height={100} 
                              className="h-full w-full object-cover"
                           />
                        )}
                     </div>
               )}
            </div>
         </Card>

         <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled}
         />

         {error && (
            <div className="flex items-center space-x-2">
               <Badge variant="destructive" className="text-xs">
                  Error
               </Badge>
               <p className="text-xs text-red-600">{error}</p>
            </div>
         )}
      </div>
   );
};

export default ImageUpload;