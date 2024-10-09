import React from "react";

export default function FilterSlider({
  label,
  value,
  onChange,
  min,
  max,
  icon,
}) {
  return (
    <div>
      <div className="flex items-center mb-2">
        {icon}
        <label className="ml-2 font-medium">{label}</label>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full"
      />
    </div>
  );
}
