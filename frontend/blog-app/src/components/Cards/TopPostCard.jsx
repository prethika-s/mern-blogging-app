import React from "react";
import { LuHeart } from "react-icons/lu";

const TopPostCard = ({ title, coverImageUrl, views, likes, maxViews }) => {
  const viewPercentage = ((views / maxViews) * 100).toFixed(0);

  return (
    <div className="bg-white py-4 flex flex-col gap-3 border-b border-gray-100">
      {/* Post Thumbnail and Title */}
      <div className="flex items-start gap-2">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-10 h-10 rounded-md object-cover"
        />
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {title}
        </h3>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-1.5 bg-sky-100/60 rounded-full overflow-hidden mt-1">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full transition-all duration-300"
          style={{ width: `${viewPercentage}%` }}
        ></div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span className="flex items-center gap-1 text-sm text-black">
          {views} views
        </span>
        <span className="flex items-center gap-1 text-sm text-black">
          <LuHeart className="text-[16px] text-gray-500" />
          {likes} likes
        </span>
      </div>
    </div>
  );
};

export default TopPostCard;
