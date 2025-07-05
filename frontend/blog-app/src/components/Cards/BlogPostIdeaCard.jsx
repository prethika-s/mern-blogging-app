import React from "react";

const BlogPostIdeaCard = ({ title, description, tags = [], tone = "casual", onSelect }) => {
  return (
    <div
      className="border-b border-gray-100 hover:bg-gray-100/60 px-6 py-5 cursor-pointer transition-colors"
      onClick={onSelect}
    >
      <h3 className="text-sm text-black font-semibold flex items-center gap-2">
        {title}
        <span className="text-[11px] text-yellow-800 bg-yellow-100 px-2 py-[2px] rounded-full">
          {tone}
        </span>
      </h3>

      {description && (
        <p className="text-xs font-medium text-gray-600 mt-1">{description}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {tags.map((tag, index) => (
            <div
              key={`tag_${index}`}
              className="text-xs text-sky-700 font-medium bg-sky-50 px-2.5 py-1 rounded"
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPostIdeaCard;
