import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const TrendingPostsSection = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);

  const getTrendingPosts = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.POSTS.GET_TRENDING_POSTS);
      setPostList(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Error fetching trending posts:", error);
    }
  };

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  useEffect(() => {
    getTrendingPosts();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">🔥 Trending Posts</h2>
      {postList.length === 0 ? (
        <p className="text-sm text-gray-500">No trending posts available.</p>
      ) : (
        <div className="space-y-4">
          {postList.map((post) => (
            <div
              key={post._id}
              onClick={() => handleClick(post)}
              className="cursor-pointer hover:bg-gray-50 p-2 rounded-md transition"
            >
              {post.coverImageUrl && (
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
              )}
              <h3 className="text-sm font-medium line-clamp-2">{post.title}</h3>
              <p className="text-xs text-gray-400 mt-1">
                {moment(post.updatedAt).format("Do MMM YYYY")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingPostsSection;
