import React, { useState } from "react";
import {
  MdBrightness6,
  MdColorLens,
  MdInvertColors,
  MdGradient,
  MdCompress,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import FilterSlider from "./FilterSlider";

const CollapsibleSection = ({ title, icon, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-700 pb-2">
      <button
        className="flex items-center justify-between w-full py-2 text-white"
        onClick={onToggle}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </div>
        {isOpen ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

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
  originalSize,
  format,
  setFormat,
}) {
  const [compressionPercentage, setCompressionPercentage] = useState(50);
  const [estimatedSize, setEstimatedSize] = useState(null);
  const [openSections, setOpenSections] = useState({
    brightness: false,
    saturation: false,
    inversion: false,
    grayscale: false,
    rotation: false,
    compression: false,
  });

  const handlePercentageChange = (percentage) => {
    setCompressionPercentage(percentage);
    if (originalSize) {
      const estimated = (originalSize * (percentage / 100)).toFixed(2);
      setEstimatedSize(estimated);
    }
  };

  const handleCompressionClick = () => {
    compressAndDownloadImage(compressionPercentage, format);
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-64 bg-gray-900 p-4 space-y-2">
      <CollapsibleSection
        title="Brightness"
        icon={<MdBrightness6 size={24} />}
        isOpen={openSections.brightness}
        onToggle={() => toggleSection("brightness")}
      >
        <FilterSlider
          label="Brightness"
          value={brightness}
          onChange={setBrightness}
          min={0}
          max={200}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="Saturation"
        icon={<MdColorLens size={24} />}
        isOpen={openSections.saturation}
        onToggle={() => toggleSection("saturation")}
      >
        <FilterSlider
          label="Saturation"
          value={saturation}
          onChange={setSaturation}
          min={0}
          max={200}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="Inversion"
        icon={<MdInvertColors size={24} />}
        isOpen={openSections.inversion}
        onToggle={() => toggleSection("inversion")}
      >
        <FilterSlider
          label="Inversion"
          value={inversion}
          onChange={setInversion}
          min={0}
          max={100}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="Grayscale"
        icon={<MdGradient size={24} />}
        isOpen={openSections.grayscale}
        onToggle={() => toggleSection("grayscale")}
      >
        <FilterSlider
          label="Grayscale"
          value={grayscale}
          onChange={setGrayscale}
          min={0}
          max={100}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="Rotation"
        icon={<MdGradient size={24} />}
        isOpen={openSections.rotation}
        onToggle={() => toggleSection("rotation")}
      >
        <div>
          <label className="block mb-2 font-medium">Rotation</label>
          <input
            type="number"
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value, 10) % 360)}
            className="bg-gray-800 text-white p-2 rounded w-full"
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="Compression"
        icon={<MdCompress size={24} />}
        isOpen={openSections.compression}
        onToggle={() => toggleSection("compression")}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            {/* <label className="block mb-2 font-medium text-white"> */}
            {/* Compression Percentage */}
            {/* </label> */}
            <input
              type="number"
              value={compressionPercentage}
              onChange={(e) => handlePercentageChange(Number(e.target.value))}
              min="1"
              max="100"
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>

          <div className="flex-1">
            {/* <label className="block mb-2 font-medium text-white">Format</label> */}
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded w-full"
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WEBP</option>
              <option value="gif">GIF</option>
            </select>
          </div>
        </div>

        <div className="text-white mt-4">
          {originalSize && (
            <p>
              Original Size: <strong>{originalSize} MB</strong>
            </p>
          )}
          {estimatedSize && (
            <p>
              Estimated Compressed Size: <strong>{estimatedSize} MB</strong>
            </p>
          )}
        </div>

        <button
          onClick={handleCompressionClick}
          className="bg-blue-500 text-white p-2 rounded w-full flex items-center justify-center space-x-2 hover:bg-blue-600 mt-4"
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
            <span className="text-sm text-gray-400">
              {compressionProgress}%
            </span>
          </div>
        )}
      </CollapsibleSection>
    </div>
  );
}
