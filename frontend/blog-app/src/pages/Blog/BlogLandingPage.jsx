import React, { useState, useEffect } from "react";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { LuGalleryVerticalEnd, LuLoaderCircle } from "react-icons/lu";
import FeaturedBlogPost from "./components/FeaturedBlogPost";
import BlogPostSummaryCard from "./components/BlogPostSummaryCard";
import TrendingPostsSection from "./components/TrendingPostsSection";

const BlogLandingPage = () => {
  const navigate = useNavigate();
  const [blogPostList, setBlogPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAllPosts = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL, {
        params: {
          status: "published",
          page: pageNumber,
        },
      });

      const { posts, totalPages } = response.data;
      setBlogPostList((prev) => (pageNumber === 1 ? posts : [...prev, ...posts]));
      setTotalPages(totalPages);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  const handleLoadMore = () => {
    if (page < totalPages) getAllPosts(page + 1);
  };

  useEffect(() => {
    getAllPosts(1);
  }, []);

  return (
    <BlogLayout>
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {blogPostList.length > 0 && (
              <FeaturedBlogPost
                title={blogPostList[0].title}
                coverImageUrl={blogPostList[0].coverImageUrl}
                description={blogPostList[0].content}
                tags={blogPostList[0].tags}
                updatedOn={
                  blogPostList[0].updatedAt
                    ? moment(blogPostList[0].updatedAt).format("Do MMM YYYY")
                    : "-"
                }
                authorName={blogPostList[0].author?.name || "Unknown"}
                authorProfileImg={blogPostList[0].author?.profileImageUrl || ""}
                onClick={() => handleClick(blogPostList[0])}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPostList.slice(1).map((post) => (
                <BlogPostSummaryCard
                  key={post._id}
                  title={post.title}
                  coverImageUrl={post.coverImageUrl}
                  description={post.content}
                  tags={post.tags}
                  updatedOn={
                    post.updatedAt
                      ? moment(post.updatedAt).format("Do MMM YYYY")
                      : "-"
                  }
                  authorName={post.author?.name || "Unknown"}
                  authorProfileImg={post.author?.profileImageUrl || ""}
                  onClick={() => handleClick(post)}
                />
              ))}
            </div>

            {page < totalPages && (
              <div className="flex justify-center">
                <button
                  className="flex items-center gap-3 text-sm text-white font-medium bg-black px-7 py-2.5 mt-6 rounded-full hover:scale-105 transition-transform"
                  disabled={isLoading}
                  onClick={handleLoadMore}
                >
                  {isLoading ? (
                    <LuLoaderCircle className="animate-spin text-[15px]" />
                  ) : (
                    <LuGalleryVerticalEnd className="text-lg" />
                  )}
                  {isLoading ? " Loading..." : " Load More"}
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <TrendingPostsSection />
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogLandingPage;
