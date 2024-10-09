import React, { useState } from "react";
import "./App.css";
import { MdRotate90DegreesCcw } from "react-icons/md";

function App() {
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [inversion, setInversion] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setSelectedImage(URL.createObjectURL(img));
    }
  };

  const resetFilters = () => {
    setBrightness(100);
    setSaturation(100);
    setInversion(0);
    setGrayscale(0);
    setRotation(0);
  };

  const rotateImage = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const handleRotationChange = (e) => {
    const newRotation = parseInt(e.target.value, 10);
    if (!isNaN(newRotation)) {
      setRotation(newRotation % 360); // Ensure rotation is between 0 and 360
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Image Editor</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        {selectedImage && (
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
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Brightness</label>
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Saturation</label>
            <input
              type="range"
              min="0"
              max="200"
              value={saturation}
              onChange={(e) => setSaturation(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Inversion</label>
            <input
              type="range"
              min="0"
              max="100"
              value={inversion}
              onChange={(e) => setInversion(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Grayscale</label>
            <input
              type="range"
              min="0"
              max="100"
              value={grayscale}
              onChange={(e) => setGrayscale(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Rotation Control */}
          <div className="flex items-center space-x-2">
            <button
              onClick={rotateImage}
              className="bg-blue-500 text-white text-2xl py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              <MdRotate90DegreesCcw />
            </button>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={rotation}
                onChange={handleRotationChange}
                className="border border-gray-300 rounded p-2 w-16"
              />
              <span>°</span>
            </div>
          </div>
        </div>

        <button
          onClick={resetFilters}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default App;
