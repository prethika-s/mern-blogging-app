import React from 'react';
import { LuEye, LuHeart, LuTrash2 } from "react-icons/lu";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const BlogPostSummaryCard = ({
  title,
  imgUrl,
  updatedOn,
  tags = [],
  likes,
  views,
  onClick,
  onDelete,
}) => {
  return (
    <div
      onClick={onClick}
      className="group flex gap-4 sm:gap-6 items-start bg-white rounded-xl border border-gray-200/60 p-3 sm:p-4 cursor-pointer hover:shadow-sm transition relative"
    >
      {/* Thumbnail */}
      <img
        src={imgUrl || "/default-post.jpg"}
        alt={title}
        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1">
        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-sky-600 transition line-clamp-2">
          {title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-[11px] sm:text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mt-2 text-[12px] sm:text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <LuEye className="text-gray-400" />
            {views}
          </span>
          <span className="flex items-center gap-1">
            <LuHeart className="text-gray-400" />
            {likes}
          </span>
          <span>
            Updated{" "}
            {updatedOn && dayjs(updatedOn).isValid()
              ? dayjs(updatedOn).fromNow()
              : "N/A"}
          </span>
        </div>
      </div>

      {/* Delete Button */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering onClick
            onDelete();
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
        >
          <LuTrash2 />
        </button>
      )}
    </div>
  );
};

export default BlogPostSummaryCard;
