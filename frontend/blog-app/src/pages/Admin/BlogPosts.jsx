import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import {
  LuGalleryVerticalEnd,
  LuLoaderCircle,
  LuPlus,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Modal from "../../components/Modal";
import Tabs from "../../components/Tabs";
import BlogPostSummaryCard from "../../components/Cards/BlogPostSummaryCard";
import DeleteAlertContent from "../../components/DeleteAlertContent";

dayjs.extend(localizedFormat);

const BlogPosts = () => {
  const navigate = useNavigate();

  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [blogPostList, setBlogPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const getAllPosts = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const statusParam = filterStatus !== "All" ? filterStatus.toLowerCase() : undefined;

      const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL, {
        params: {
          ...(statusParam && { status: statusParam }),
          page: pageNumber,
        },
      });

      const {
        posts = [],
        totalPages: fetchedTotalPages = 0,
        counts = {},
      } = response.data || {};

      setBlogPostList((prevPosts) =>
        pageNumber === 1 ? posts : [...prevPosts, ...posts]
      );
      setTotalPages(fetchedTotalPages);
      setPage(pageNumber);

      setTabs([
        { label: "All", count: counts?.all || 0 },
        { label: "Published", count: counts?.published || 0 },
        { label: "Draft", count: counts?.draft || 0 },
      ]);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      toast.error("Failed to load blog posts.");
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axiosInstance.delete(API_PATHS.POSTS.DELETE(postId));
      toast.success("Post deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      getAllPosts(1);
    } catch (error) {
      toast.error("Failed to delete post.");
    }
  };

  const handleLoadMore = () => {
  console.log("Load more clicked | currentPage:", page, "totalPages:", totalPages);
  if (page < totalPages) getAllPosts(page + 1);
};


  useEffect(() => {
    getAllPosts(1);
  }, [filterStatus]);

  const formatUpdatedDate = (dateString) => {
    const parsedDate = dayjs(dateString);
    return parsedDate.isValid() ? parsedDate.format("D MMM YYYY") : "-";
  };

  return (
    <DashboardLayout activeMenu="Blog Posts">
      <div className="w-auto sm:max-w-[900px] mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mt-5 mb-5">Blog Posts</h2>
          <button
            className="btn-small"
            onClick={() => navigate("/admin/create")}
          >
            <LuPlus className="text-[18px]" /> Create Post
          </button>
        </div>

        <Tabs
          tabs={tabs}
          activeTab={filterStatus}
          setActiveTab={setFilterStatus}
        />

        <div className="mt-5">
          {blogPostList.length === 0 && !isLoading && (
            <p className="text-center text-gray-500 mt-8">
              No posts found for selected filter.
            </p>
          )}

          {blogPostList.map((post) => (
            <BlogPostSummaryCard
              key={post._id}
              title={post.title}
              imgUrl={post.coverImageUrl}
              updatedOn={formatUpdatedDate(post.updatedAt)}
              tags={post.tags}
              likes={post.likes}
              views={post.views}
              onClick={() => navigate(`/admin/edit/${post.slug}`)}
              onDelete={() =>
                setOpenDeleteAlert({ open: true, data: post._id })
              }
            />
          ))}

          {blogPostList.length > 0 && (
            <div className="flex items-center justify-center mb-8 mt-4">
              <button
                className="flex items-center gap-3 text-white font-medium bg-black px-7 py-2.5 rounded-full text-nowrap hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
                disabled={isLoading || page >= totalPages}
                onClick={handleLoadMore}
              >
                {isLoading ? (
                  <LuLoaderCircle className="animate-spin text-[15px]" />
                ) : (
                  <LuGalleryVerticalEnd className="text-lg" />
                )}
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>

        {openDeleteAlert.open && (
          <Modal
            isOpen={true}
            title="Delete Post?"
            onClose={() => setOpenDeleteAlert({ open: false, data: null })}
          >
            <div className="w-[70vw] md:w-[30vw]">
              <DeleteAlertContent
                content="Are you sure you want to delete this blog post?"
                onDelete={() => deletePost(openDeleteAlert.data)}
              />
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BlogPosts;
