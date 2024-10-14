import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdCloudUpload } from "react-icons/md";

export default function ImageUploader({ onImageChange }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const img = acceptedFiles[0];
        const fileSizeMB = (img.size / 1024 / 1024).toFixed(2);
        onImageChange(URL.createObjectURL(img), fileSizeMB);
      }
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-gray-500 transition"
    >
      <input {...getInputProps()} />
      <MdCloudUpload size={48} className="mx-auto mb-4" />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drag & drop an image here, or click to select one</p>
      )}
    </div>
  );
}
