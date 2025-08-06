'use client';

import { useState } from 'react';
import VariantImageUpload from './variant-image-upload';

const VariantImageUploadExample = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    console.log('Selected file:', file);
  };

  const handleImageUrlChange = (url: string | null) => {
    setPreviewUrl(url);
    console.log('Preview URL:', url);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Here you would typically upload the file to your server
      console.log('Uploading file:', selectedFile);
      
      // Example: Create FormData for API upload
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // Example API call (commented out)
      // fetch('/api/upload-variant-image', {
      //   method: 'POST',
      //   body: formData,
      // });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-lg font-semibold">Variant Image Upload Example</h2>
      
      <VariantImageUpload
        onImageChange={handleImageChange}
        onImageUrlChange={handleImageUrlChange}
        maxSizeMB={2}
        className="w-full"
      />

      <div className="space-y-2 text-sm">
        <p><strong>Selected file:</strong> {selectedFile?.name || 'None'}</p>
        <p><strong>File size:</strong> {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'N/A'}</p>
        <p><strong>File type:</strong> {selectedFile?.type || 'N/A'}</p>
      </div>

      {selectedFile && (
        <button 
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Upload Image
        </button>
      )}
    </div>
  );
};

export default VariantImageUploadExample;
