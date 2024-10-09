import React from "react";

const FilterSlider = ({ label, value, onChange, min, max }) => {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default FilterSlider;
