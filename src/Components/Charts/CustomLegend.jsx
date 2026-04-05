import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      {payload?.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center gap-2"
        >
          {/* Color Dot */}
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />

          {/* Label */}
          <span className="text-xs text-gray-300 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;