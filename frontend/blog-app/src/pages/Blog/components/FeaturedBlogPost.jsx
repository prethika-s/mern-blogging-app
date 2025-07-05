import React from "react";

const FeaturedBlogPost = ({
  title,
  coverImageUrl,
  description,
  tags = [],
  updatedOn,
  authorName,
  authorProfileImg,
  onClick,
}) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-12 bg-white shadow-lg shadow-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      {/* Left: Cover Image */}
      <div className="md:col-span-5">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-full h-60 md:h-full object-cover"
        />
      </div>

      {/* Right: Text Content */}
      <div className="md:col-span-7 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg md:text-2xl font-bold mb-2 line-clamp-3">
            {title}
          </h2>

          <p className="text-gray-700 text-[13px] mb-4 line-clamp-3">
            {description}
          </p>

          <div className="flex items-center flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5 rounded-full text-nowrap"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center mt-2">
          <img
            src={authorProfileImg || "/default-avatar.png"}
            alt={authorName}
            onError={(e) => (e.target.src = "/default-avatar.png")}
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
          <div>
            <p className="text-gray-600 text-sm">{authorName}</p>
            <p className="text-gray-500 text-xs">{updatedOn}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogPost;
