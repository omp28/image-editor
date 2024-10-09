import React, { useState, useRef } from "react";
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
  const canvasRef = useRef(null);

  const resetFilters = () => {
    setBrightness(100);
    setSaturation(100);
    setInversion(0);
    setGrayscale(0);
    setRotation(0);
  };

  const downloadEditedImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = selectedImage;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
      ctx.restore();

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      link.download = "edited-image.jpg";
      link.click();
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Image Editor</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <ImageUploader onImageChange={setSelectedImage} />
        {selectedImage && (
          <>
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
            <RotateButton
              rotateImage={() => setRotation((prev) => (prev + 90) % 360)}
              rotation={rotation}
              setRotation={setRotation}
            />
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            <button
              onClick={downloadEditedImage}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Download Image
            </button>
          </>
        )}
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
