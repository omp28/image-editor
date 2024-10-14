import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const CompressImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [compressedBlob, setCompressedBlob] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        onProgress: (progress) => {
          setCompressionProgress(progress);
        },
      };

      try {
        const compressedBlob = await imageCompression(file, options);
        const compressedFileURL = URL.createObjectURL(compressedBlob);
        setCompressedBlob(compressedBlob);
        setCompressedFile(compressedFileURL);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    }
  };

  const handleDownload = () => {
    if (compressedBlob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(compressedBlob);
      link.download = "compressed-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 bg-gray-100">
      <h2 className="text-2xl font-bold mb-5">Image Compression</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-5"
      />

      <div
        className="flex justify-between w-5/6 mx-auto bg-white p-5 rounded shadow-lg"
        style={{ width: "70%" }}
      >
        {selectedFile && (
          <div className="w-1/2 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-3">Original Image</h3>
            <img
              src={selectedFile}
              alt="Original"
              className="max-w-full max-h-96 object-contain mb-3"
            />
          </div>
        )}

        {compressedFile && (
          <div className="w-1/2 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-3">Compressed Image</h3>
            <img
              src={compressedFile}
              alt="Compressed"
              className="max-w-full max-h-96 object-contain mb-3"
            />

            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Download Compressed Image
            </button>
          </div>
        )}
      </div>

      {compressionProgress > 0 && compressionProgress < 100 && (
        <div className="mt-5 text-gray-700">
          Compression in progress: {compressionProgress}%
        </div>
      )}
    </div>
  );
};

export default CompressImage;
