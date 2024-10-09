import React from "react";
import FilterSlider from "./FilterSlider";

const ImageEditor = ({
  selectedImage,
  brightness,
  setBrightness,
  saturation,
  setSaturation,
  inversion,
  setInversion,
  grayscale,
  setGrayscale,
  rotation,
}) => {
  return (
    <div className="relative mb-4">
      <img
        src={selectedImage}
        alt="Selected"
        className="w-full object-contain"
        style={{
          filter: `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`,
          transform: `rotate(${rotation}deg)`,
        }}
      />
      <div className="space-y-4">
        <FilterSlider
          label="Brightness"
          value={brightness}
          onChange={setBrightness}
          min={0}
          max={200}
        />
        <FilterSlider
          label="Saturation"
          value={saturation}
          onChange={setSaturation}
          min={0}
          max={200}
        />
        <FilterSlider
          label="Inversion"
          value={inversion}
          onChange={setInversion}
          min={0}
          max={100}
        />
        <FilterSlider
          label="Grayscale"
          value={grayscale}
          onChange={setGrayscale}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default ImageEditor;
