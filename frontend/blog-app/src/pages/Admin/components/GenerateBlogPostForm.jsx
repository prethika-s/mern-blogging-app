import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Inputs/Input";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { LuLoaderCircle } from "react-icons/lu";

const GenerateBlogPostForm = ({ contentParams, setPostContent, handleCloseForm }) => {
  const [formData, setFormData] = useState({
    title: contentParams?.title || "",
    tone: contentParams?.tone || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleGenerateBlogPost = async (e) => {
    e.preventDefault();
    const { title, tone } = formData;

    if (!title || !tone) {
      setError("Please fill all the required fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_BLOG_POST, {
        title,
        tone,
      });

      const generatedPost = aiResponse.data?.content || aiResponse.data;
      setPostContent(title, generatedPost);
      handleCloseForm();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleGenerateBlogPost} className="space-y-4 p-5">
      <div>
        <label className="text-xs font-medium text-gray-700">Blog Title</label>
        <Input
          type="text"
          placeholder="e.g. How to build a blog with React"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700">Tone</label>
        <Input
          type="text"
          placeholder="e.g. casual, professional, witty..."
          value={formData.tone}
          onChange={(e) => handleChange("tone", e.target.value)}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <LuLoaderCircle className="animate-spin text-base" />
            Generating...
          </>
        ) : (
          "Generate Blog Post"
        )}
      </button>
    </form>
  );
};

export default GenerateBlogPostForm;
