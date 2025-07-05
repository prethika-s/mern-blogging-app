import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { LuCircleAlert, LuDot, LuSparkles } from "react-icons/lu";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";
import TrendingPostsSection from "./components/TrendingPostsSection";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import { useNavigate, useParams } from "react-router-dom";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import MarkdownContent from "./components/MarkDownContent";
import { sanitizeMarkdown } from "../../utils/helper";
import Drawer from "../../components/Drawer";

const BlogPostView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, setOpenAuthForm } = useContext(UserContext);

  const [blogPostData, setBlogPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // NEW STATES
  const [summaryContent, setSummaryContent] = useState(null);
  const [openSummrizeDrawer, setOpenSummrizeDrawer] = useState(false);

  const fetchPostDetailsBySlug = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.POSTS.GET_BY_SLUG(slug));
      setBlogPostData(response.data);
      incrementViews(response.data._id);
      fetchCommentsByPostId(response.data._id);
    } catch (error) {
      setErrorMsg("Failed to load post.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateBlogPostSummary = async () => {
    try {
      setErrorMsg("");
      setSummaryContent(null);
      setIsLoading(true);
      setOpenSummrizeDrawer(true);

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_POST_SUMMARY, {
        content: blogPostData.content || "",
      });

      if (response.data) {
        setSummaryContent(response.data);
      }
    } catch (error) {
      setSummaryContent(null);
      setErrorMsg("Failed to generate summary, Try again later");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCommentsByPostId = async (postId) => {
    try {
      const response = await axiosInstance.get(API_PATHS.COMMENTS.GET_ALL_BY_POST(postId));
      if (response.data) {
        setComments(response.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const incrementViews = async (postId) => {
    if (!postId) return;
    try {
      await axiosInstance.post(API_PATHS.POSTS.INCREMENT_VIEW(postId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddReply = async () => {
    if (!user) {
      setOpenAuthForm(true);
      return;
    }
    if (!replyText.trim()) return;
    try {
      const response = await axiosInstance.post(API_PATHS.COMMENTS.CREATE, {
        postId: blogPostData._id,
        content: replyText,
      });
      setComments([...comments, response.data]);
      setReplyText("");
      setShowReplyForm(false);
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  useEffect(() => {
    fetchPostDetailsBySlug();
  }, [slug]);

  return (
    <BlogLayout>
      {blogPostData && (
        <>
          <title>{blogPostData.title}</title>
          <meta name="description" content={blogPostData.title} />
          <meta property="og:title" content={blogPostData.title} />
          <meta property="og:image" content={blogPostData.coverImageUrl} />
          <meta property="og:type" content="article" />

          <div className="grid grid-cols-12 gap-6 md:gap-8 relative">
            {/* Left: Blog Content */}
            <div className="col-span-12 md:col-span-8 relative px-4 sm:px-6 md:px-10 lg:pl-16">
              <h1 className="text-lg md:text-2xl font-bold mb-2 line-clamp-3">
                {blogPostData.title}
              </h1>

              <div className="flex items-center gap-1 flex-wrap mt-3 mb-5">
                <span className="text-[13px] text-gray-500 font-medium">
                  {moment(blogPostData.updatedAt || "").format("Do MMM YYYY")}
                </span>

                <LuDot className="text-xl text-gray-400" />

                <div className="flex items-center flex-wrap gap-2">
                  {blogPostData.tags.slice(0, 3).map((tag, index) => (
                    <button
                      key={index}
                      className="bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5 rounded-full text-nowrap cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/tag/${tag}`);
                      }}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>

                <LuDot className="text-xl text-gray-400" />

                <button
                  className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-xs text-white font-medium px-3 py-0.5 rounded-full text-nowrap cursor-pointer hover:scale-[1.02] transition-all my-1.5"
                  onClick={generateBlogPostSummary}
                >
                  <LuSparkles /> Summarize Post
                </button>
              </div>

              <img
                src={blogPostData.coverImageUrl || ""}
                alt={blogPostData.title}
                className="w-full max-h-[550px] object-cover mb-6 rounded-lg"
              />

              <div>
                <MarkdownContent
                  content={sanitizeMarkdown(blogPostData?.content || "")}
                />
              </div>
            </div>

            {/* Right: Trending Posts */}
            <div className="col-span-12 md:col-span-4">
              <TrendingPostsSection />
            </div>
          </div>

          {/* Drawer for Summary */}
          <Drawer
            isOpen={openSummrizeDrawer}
            onClose={() => setOpenSummrizeDrawer(false)}
            title="AI-generated blog summary"
          >
            {isLoading ? (
              <SkeletonLoader />
            ) : errorMsg ? (
              <p className="text-red-500">{errorMsg}</p>
            ) : (
              <div className="text-gray-700 whitespace-pre-wrap text-sm">
                {summaryContent}
              </div>
            )}
          </Drawer>
        </>
      )}
    </BlogLayout>
  );
};

export default BlogPostView;
