import React, { useState, useRef } from "react";
import { MdRotateRight, MdDownload, MdRefresh } from "react-icons/md";
import ImageUploader from "./components/ImageUploader";
import ImageEditor from "./components/ImageEditor";
import ToolBar from "./components/ToolBar";
import imageCompression from "browser-image-compression";

export default function App() {
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [inversion, setInversion] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [originalSize, setOriginalSize] = useState(null);
  const [format, setFormat] = useState("jpeg");
  const canvasRef = useRef(null);

  const handleImageChange = (imageUrl, size) => {
    setSelectedImage(imageUrl);
    setOriginalSize(size);
  };

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

      link.href = canvas.toDataURL(`image/${format}`);
      link.download = `edited-image.${format}`;
      link.click();
    };
  };

  const compressAndDownloadImage = async (compressionPercentage) => {
    if (!selectedImage) return;

    try {
      setCompressionProgress(0);

      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const file = new File([blob], `image.${format}`, {
        type: `image/${format}`,
      });

      const originalFileSizeMB = file.size / 1024 / 1024;
      setOriginalSize(originalFileSizeMB.toFixed(2));

      const desiredFileSizeMB =
        originalFileSizeMB * (compressionPercentage / 100);

      const options = {
        maxSizeMB: desiredFileSizeMB,
        useWebWorker: true,
        onProgress: (progress) => {
          setCompressionProgress(Math.round(progress));
        },
      };

      const compressedBlob = await imageCompression(file, options);

      const compressedFileURL = URL.createObjectURL(compressedBlob);
      const link = document.createElement("a");
      link.href = compressedFileURL;
      link.download = `compressed-image.${format}`;
      link.click();

      setCompressionProgress(100);
    } catch (error) {
      console.error("Compression error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <ToolBar
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
        compressAndDownloadImage={compressAndDownloadImage}
        compressionProgress={compressionProgress}
        originalSize={originalSize}
        format={format}
        setFormat={setFormat}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex justify-center items-center my-4">
          <img
            src="/icon.webp"
            alt="ImageMaster Logo"
            className="h-14 w-14 rounded-2xl "
          />

          <h1 className="text-3xl font-bold pl-4  text-center">imageMaster</h1>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {selectedImage ? (
            <ImageEditor
              selectedImage={selectedImage}
              brightness={brightness}
              saturation={saturation}
              inversion={inversion}
              grayscale={grayscale}
              rotation={rotation}
            />
          ) : (
            <ImageUploader onImageChange={handleImageChange} />
          )}
        </div>
        <div className="p-4 flex justify-center space-x-4">
          <button
            onClick={() => setRotation((prev) => (prev + 90) % 360)}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
          >
            <MdRotateRight size={24} />
          </button>

          <div className="space-x-2 flex items-center">
            <label htmlFor="format">Export As: </label>
            <select
              id="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded"
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WEBP</option>
              <option value="gif">GIF</option>
            </select>
          </div>

          <button
            onClick={downloadEditedImage}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
          >
            <MdDownload size={24} />
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
          >
            <MdRefresh size={24} />
          </button>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}
