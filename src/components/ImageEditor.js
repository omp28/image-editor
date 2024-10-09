import React from "react";

export default function ImageEditor({
  selectedImage,
  brightness,
  saturation,
  inversion,
  grayscale,
  rotation,
}) {
  return (
    <div className="relative">
      <img
        src={selectedImage}
        alt="Selected"
        className="max-w-full max-h-[70vh] object-contain"
        style={{
          filter: `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`,
          transform: `rotate(${rotation}deg)`,
        }}
      />
    </div>
  );
}
