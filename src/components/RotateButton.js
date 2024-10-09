import React from "react";
import { MdRotate90DegreesCcw } from "react-icons/md";

const RotateButton = ({ rotateImage, rotation, setRotation }) => {
  const handleRotationChange = (e) => {
    const newRotation = parseInt(e.target.value, 10);
    if (!isNaN(newRotation)) {
      setRotation(newRotation % 360);
    }
  };

  return (
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
  );
};

export default RotateButton;
