import { useListingStore } from '@/store/store';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const PictureUpload: React.FC = () => {
  const { listingData, uploadImages } = useListingStore();

  const onDrop = (acceptedFiles: File[]) => {
    uploadImages(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });

  console.log(listingData);

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 p-4 rounded-md text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag and drop your pictures here, or click to select files</p>
      </div>

      <div className="mt-4">
        {listingData.images.map((file, index) => (
          <div key={index} className="text-sm text-gray-600">
            {file.name} - {(file.size / 1024).toFixed(2)} KB
          </div>
        ))}
      </div>
    </div>
  );
};

export default PictureUpload;
