import React, { useState } from "react";
import "./App.css";
import ImageUploader from "./components/ImageUploader";
import ImageEditor from "./components/ImageEditor";
import RotateButton from "./components/RotateButton";

function App() {
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [inversion, setInversion] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const resetFilters = () => {
    setBrightness(100);
    setSaturation(100);
    setInversion(0);
    setGrayscale(0);
    setRotation(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Image Editor</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <ImageUploader onImageChange={setSelectedImage} />
        {selectedImage && (
          <ImageEditor
            selectedImage={selectedImage}
            brightness={brightness}
            setBrightness={setBrightness}
            saturation={saturation}
            setSaturation={setSaturation}
            inversion={inversion}
            setInversion={setInversion}
            grayscale={grayscale}
            setGrayscale={setGrayscale}
            rotation={rotation}
            setRotation={setRotation}
          />
        )}
        <RotateButton
          rotateImage={() => setRotation((prev) => (prev + 90) % 360)}
          rotation={rotation}
          setRotation={setRotation}
        />
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
