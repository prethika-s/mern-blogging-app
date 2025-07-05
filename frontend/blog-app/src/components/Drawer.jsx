import React from "react";
import { LuSparkles, LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[70px] right-0 z-40 h-[calc(100dvh-70px)] p-4 overflow-y-auto transition-transform bg-white w-full md:w-[35vw] shadow-2xl shadow-cyan-800/10 border-l border-gray-100
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <LuSparkles className="text-cyan-600" />
            <span className="text-lg font-semibold">Summarize this post</span>
          </div>
          <h5 id="drawer-right-label" className="text-sm text-gray-600 mt-1">
            {title}
          </h5>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 transition-all"
        >
          <LuX size={20} />
        </button>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
};

export default Drawer;
