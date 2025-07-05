import React from 'react';
import moment from "moment";
import { LuDot } from "react-icons/lu";

const RecentCommentList = ({ comments }) => {
  return (
    <div className="mt-4">
      <ul className="flex flex-col gap-4">
        {comments?.slice(0, 10)?.map((comment) => (
          <li
            key={comment._id}
            className="flex items-start gap-3 w-full"
          >
            {/* Profile Image */}
            <img
              src={comment?.author?.profileImageUrl || "/default-avatar.png"}
              alt={comment?.author?.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />

            {/* Comment Info */}
            <div className="flex flex-col w-full">
              <p className="text-sm md:text-base text-gray-800 leading-snug">
                <span className="font-semibold">{comment?.author?.name}</span> commented on{" "}
                <a
                  href="#"
                  className="underline hover:text-sky-600 transition"
                >
                  {comment?.post?.title}
                </a>
              </p>

              {/* Comment Text */}
              <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2 max-w-full">
                {comment?.content}
              </p>

              {/* Timestamp */}
              <div className="flex items-center text-xs md:text-sm text-gray-400 mt-1">
                <LuDot className="text-gray-400 text-base" />
                {moment(comment?.createdAt).fromNow()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentCommentList;
