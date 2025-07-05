import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import MDEditor, { commands } from "@uiw/react-md-editor";
import {
  LuLoaderCircle,
  LuSave,
  LuSend,
  LuSparkles,
  LuTrash2,
} from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate, useParams } from "react-router-dom";
import CoverImageSelector from "../../components/Inputs/CoverImageSelector";
import TagInput from "../../components/Inputs/TagInput";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import BlogPostIdeaCard from "../../components/Cards/BlogPostIdeaCard";
import Modal from "../../components/Modal";
import GenerateBlogPostForm from "./components/GenerateBlogPostForm";
import {toast} from "react-hot-toast";
import { getToastMessagesByType } from "../../utils/helper";
import uploadImage from "../../utils/uploadImage";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const BlogPostEditor = () => {
  const navigate = useNavigate();
  const { postSlug = "" } = useParams();
  const isEdit = !!postSlug;

  const [postData, setPostData] = useState({
    id: "",
    title: "",
    content: "",
    coverImageUrl: "",
    coverPreview: "",
    tags: [],
    isDraft: false,
    generatedByAI: false,
  });

  const [postIdeas, setPostIdeas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openBlogPostGenForm, setOpenBlogPostGenForm] = useState({
    open: false,
    data: null,
  });
  const [ideaLoading, setIdeaLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setPostData((prevData) => ({ ...prevData, [key]: value }));
  };

  const generatePostIdeas = async () => {
    setIdeaLoading(true);
    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_BLOG_POST_IDEAS,
        {
          topics:
            "React JS, Next JS, Node JS, React UI Components, Database, Mongo DB, Operating Systems, OOAD, OOPS",
        }
      );
      const generatedIdeas = aiResponse.data;

      if (generatedIdeas?.length > 0) {
        setPostIdeas(generatedIdeas);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setIdeaLoading(false);
    }
  };

  const handlePublish = async (isDraft) => {
    let coverImageUrl = "";
    if (!postData.title.trim()){
      setError("Please enter a title.");
      return;
    }
    if(!postData.content.trim()){
      setError("Please enter some content");
      return;
    }
    if(!isDraft) {
      if(!isEdit && !postData.coverImageUrl){
        setError("Please select a cover image.");
        return;
      }
      if(isEdit && !postData.coverImageUrl && !postData.coverPreview){
        setError("Please select a cover image.");
        return;
      }
      if(!postData.tags.length){
        setError("Please add some tags.");
        return;
      }
    }

    setLoading(true);
    setError("");
    try{
      if(postData.coverImageUrl instanceof File){
        const imgUploadRes = await uploadImage(postData.coverImageUrl);
        coverImageUrl = imgUploadRes.imageUrl || "";
      } else {
        coverImageUrl = postData.coverPreview;
      }

      const reqPayload = {
        title: postData.title,
        content: postData.content,
        coverImageUrl,
        tags:postData.tags,
        isDraft: isDraft?true:false,
        generatedByAI:true,
      };

      const response = isEdit
        ? await axiosInstance.put(
          API_PATHS.POSTS.UPDATE(postData.id),
          reqPayload
        )
        : await axiosInstance.post(API_PATHS.POSTS.CREATE, reqPayload);
      
      if(response.data){
        toast.success(
          getToastMessagesByType(
            isDraft ? "draft" : isEdit ? "edit" : "published"
          )
        );
        navigate("/admin/posts");
      }
    }
    catch(error){
      setError("Failed to publish blog post. Please try again.");
      console.error("Error publishing blog post:", error);
    } finally{
      setLoading(false);
    }
  };

  const fetchPostDetailsBySlug = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_SLUG(postSlug)
      );

      if(response.data){
        const data = response.data;

        setPostData((prevState) => ({
          ...prevState,
          id: data._id,
          title: data.title,
          content: data.content,
          coverPreview: data.coverImageUrl,
          tags: data.tags,
          isDraft: data.isDraft,
          generatedByAI: data.generatedByAI,
        }));
      }
    } catch (error){
      console.error("Error:",error);
    }
  };

  const deletePost = async () => {
    try{
      await axiosInstance.delete(API_PATHS.POSTS.DELETE(postData.id));

      toast.success("Blog Post Deleted Successfully");
      setOpenDeleteAlert(false);
      navigate("/admin/posts");
    } catch(error){
      console.error("Error deleting blog post:",error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchPostDetailsBySlug();
    } else {
      generatePostIdeas();
    }
  }, []);

  return (
    <DashboardLayout activeMenu="Blog Posts">
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-4">
          <div className="form-card p-6 col-span-12 md:col-span-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-medium">
                {!isEdit ? "Add New Post" : "Edit Post"}
              </h2>

              <div className="flex items-center gap-3">
                {isEdit && (
                  <button
                    className="flex items-center gap-2.5 text-[13px] font-medium text-rose-500 bg-rose-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-rose-50 hover:border-rose-300 cursor-pointer hover:scale-[1.02] transition-all"
                    disabled={loading}
                    onClick={() => setOpenDeleteAlert(true)}
                  >
                    <LuTrash2 className="text-sm" />
                    <span className="hidden md:block">Delete</span>
                  </button>
                )}

                <button
                  className="flex items-center gap-2.5 text-[13px] font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-sky-100 hover:border-sky-400 cursor-pointer hover:scale-[1.02] transition-all"
                  disabled={loading}
                  onClick={() => handlePublish(true)}
                >
                  <LuSave className="text-sm" />
                  <span className="hidden md:block">Save as Draft</span>
                </button>

                <button
                  className="flex items-center gap-2.5 text-[13px] font-medium text-sky-600 hover:text-white hover:bg-gradient-to-r from-sky-500 to-indigo-500 rounded px-3 py-[3px] border border-sky-500 hover:border-sky-50 cursor-pointer transition-all"
                  disabled={loading}
                  onClick={() => handlePublish(false)}
                >
                  {loading ? (
                    <LuLoaderCircle className="animate-spin text-[15px]" />
                  ) : (
                    <LuSend className="text-sm" />
                  )}
                  Publish
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs pb-2.5">{error}</p>
            )}

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Post Title
              </label>
              <input
                placeholder="How to Build a MERN App"
                className="form-input"
                value={postData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            <div className="mt-4">
              <CoverImageSelector
                image={postData.coverImageUrl}
                setImage={(value) =>
                  handleValueChange("coverImageUrl", value)
                }
                preview={postData.coverPreview}
                setPreview={(value) =>
                  handleValueChange("coverPreview", value)
                }
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Content
              </label>

              <div data-color-mode="light" className="mt-3">
                <MDEditor
                  value={postData.content || ""}
                  onChange={(data) =>
                    handleValueChange("content", typeof data === "string" ? data : "")
                  }
                  commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    commands.hr,
                    commands.title,
                    commands.divider,
                    commands.link,
                    commands.code,
                    commands.image,
                    commands.unorderedListCommand,
                    commands.orderedListCommand,
                    commands.checkedListCommand,
                  ]}
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Tags
              </label>
              <TagInput
                tags={postData?.tags || []}
                setTags={(data) => handleValueChange("tags", data)}
              />
            </div>
          </div>

          {!isEdit && (
            <div className="form-card col-span-12 md:col-span-4 p-0">
              <div className="flex items-center justify-between px-6 pt-6">
                <h4 className="text-sm md:text-base font-medium inline-flex items-center gap-2">
                  <span className="text-sky-600">
                    <LuSparkles />
                  </span>
                  Ideas for your next post
                </h4>

                <button
                  className="bg-gradient-to-r from-sky-500 to-cyan-400 text-[13px] font-semibold text-white rounded hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-sky-200"
                  onClick={() =>
                    setOpenBlogPostGenForm({ open: true, data: null })
                  }
                >
                  Generate New
                </button>
              </div>

              <div>
                {ideaLoading ? (
                  <div className="p-5">
                    <SkeletonLoader />
                  </div>
                ) : (
                  postIdeas.map((idea, index) => (
                    <BlogPostIdeaCard
                      key={`idea_${index}`}
                      title={idea.title || ""}
                      description={idea.description || ""}
                      tags={idea.tags || []}
                      tone={idea.tone || "casual"}
                      onSelect={() =>
                        setOpenBlogPostGenForm({ open: true, data: idea })
                      }
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={openBlogPostGenForm?.open}
        onClose={() => {
          setOpenBlogPostGenForm({ open: false, data: null });
        }}
        hideHeader
      >
        <GenerateBlogPostForm
          contentParams={openBlogPostGenForm?.data || null}
          setPostContent={(title, content) => {
            const postInfo = openBlogPostGenForm?.data || null;
            setPostData((prevState) => ({
              ...prevState,
              title: title || prevState.title,
              content: typeof content === "string" ? content : "",
              tags: postInfo?.tags || prevState.tags,
              generatedByAI: true,
            }));
          }}
          handleCloseForm={() => {
            setOpenBlogPostGenForm({ open: false, data: null });
          }}
        />
      </Modal>

      <Modal
       isOpen={openDeleteAlert}
       onClose={() => {
        setOpenDeleteAlert(false);
       }}
       title="Delete Alert"
       >
        <div className="w-[30vw]">
          <DeleteAlertContent
          content="Are you sure you want to delete this blog post?"
          onDelete={() => deletePost()}
          />
        </div>
       </Modal>
    </DashboardLayout>
  );
};

export default BlogPostEditor;
