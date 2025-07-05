import React from "react";

const DashboardSummaryCard = ({ icon, label, value, bgColor, color }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
      {/* Icon container */}
      <div
        className={`w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-sm ${bgColor} ${color}`}
      >
        {icon}
      </div>

      {/* Label and value */}
      <p className="text-xs md:text-sm text-gray-600 leading-tight">
        <span className="block text-sm md:text-base font-semibold text-gray-800">
          {value}
        </span>
        <span className="text-[13px]">{label}</span>
      </p>
    </div>
  );
};

export default DashboardSummaryCard;
