import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative px-3 md:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out 
              ${
                activeTab === tab.label
                  ? "text-black bg-gray-100"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab(tab.label)}
          >
            <div className="flex items-center gap-2">
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full 
                  ${
                    activeTab === tab.label
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
              >
                {tab.count}
              </span>
            </div>

            {/* Optional Active Tab Indicator */}
            {activeTab === tab.label && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full mt-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
