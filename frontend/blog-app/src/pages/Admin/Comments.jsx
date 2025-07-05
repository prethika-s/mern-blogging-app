import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import CommentInfoCard from "../../components/Cards/CommentInfoCard";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";

const Comments = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const getAllComments = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.COMMENTS.GET_ALL);
      setComments(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(API_PATHS.COMMENTS.DELETE(commentId));
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <DashboardLayout activeMenu="Comments">
      <div className="w-auto sm:max-w-[900px] mx-auto">
        <h2 className="text-2xl font-semibold mt-5 mb-5">Comments</h2>

        {comments.map((comment) => (
          <CommentInfoCard
            key={comment._id}
            commentId={comment._id}
            authorName={comment.author?.name || "Anonymous"}
            authorPhoto={comment.author?.profileImageUrl || ""}
            content={comment.content}
            updatedOn={
              comment.updatedAt
                ? moment(comment.updatedAt).format("Do MMM YYYY")
                : "-"
            }
            post={comment.post}
            replies={comment.replies || []}
            getAllComments={getAllComments}
            onDelete={() =>
              setOpenDeleteAlert({ open: true, data: comment._id })
            }
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Comments;
