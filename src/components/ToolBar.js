import React from "react";
import {
  MdBrightness6,
  MdColorLens,
  MdInvertColors,
  MdGradient,
} from "react-icons/md";
import FilterSlider from "./FilterSlider";

export default function ToolBar({
  brightness,
  setBrightness,
  saturation,
  setSaturation,
  inversion,
  setInversion,
  grayscale,
  setGrayscale,
  rotation,
  setRotation,
}) {
  return (
    <div className="w-64 bg-gray-900 p-4 space-y-6">
      <FilterSlider
        label="Brightness"
        value={brightness}
        onChange={setBrightness}
        min={0}
        max={200}
        icon={<MdBrightness6 size={24} />}
      />
      <FilterSlider
        label="Saturation"
        value={saturation}
        onChange={setSaturation}
        min={0}
        max={200}
        icon={<MdColorLens size={24} />}
      />
      <FilterSlider
        label="Inversion"
        value={inversion}
        onChange={setInversion}
        min={0}
        max={100}
        icon={<MdInvertColors size={24} />}
      />
      <FilterSlider
        label="Grayscale"
        value={grayscale}
        onChange={setGrayscale}
        min={0}
        max={100}
        icon={<MdGradient size={24} />}
      />
      <div>
        <label className="block mb-2 font-medium">Rotation</label>
        <input
          type="number"
          value={rotation}
          onChange={(e) => setRotation(parseInt(e.target.value, 10) % 360)}
          className="bg-gray-800 text-white p-2 rounded w-full"
        />
      </div>
    </div>
  );
}
