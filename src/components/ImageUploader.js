import React from "react";

const ImageUploader = ({ onImageChange }) => {
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      onImageChange(URL.createObjectURL(img));
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="mb-4"
    />
  );
};

export default ImageUploader;
