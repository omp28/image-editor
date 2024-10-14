import React from "react";
import {
  MdBrightness6,
  MdColorLens,
  MdInvertColors,
  MdGradient,
  MdCompress,
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
  compressAndDownloadImage,
  compressionProgress,
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

      <button
        onClick={compressAndDownloadImage}
        className="bg-blue-500 text-white p-2 rounded w-full flex items-center justify-center space-x-2 hover:bg-blue-600"
      >
        <MdCompress size={24} />
        <span>Compress & Download</span>
      </button>

      {compressionProgress > 0 && compressionProgress < 100 && (
        <div className="mt-4">
          <div className="relative w-full h-2 bg-gray-200 rounded">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
              style={{ width: `${compressionProgress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-400">{compressionProgress}%</span>
        </div>
      )}
    </div>
  );
}
