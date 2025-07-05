import React, { useContext, useState } from "react";
import {
  LuChevronDown,
  LuDot,
  LuReply,
  LuTrash2,
} from "react-icons/lu";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";

const CommentInfoCard = ({
  commentId,
  authorName,
  authorPhoto,
  content,
  updatedOn,
  post,
  replies,
  getAllComments,
  onDelete, // this will be a fallback
  isSubReply = false,
}) => {
  const { user } = useContext(UserContext);
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showSubReplies, setShowSubReplies] = useState(false);

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleAddReply = async () => {
    if (!replyText.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    if (!post || !post._id) {
      toast.error("Post ID missing. Cannot reply.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        API_PATHS.COMMENTS.ADD(post._id),
        {
          content: replyText,
          parentCommentId: commentId,
        }
      );

      if (res.data) {
        toast.success("Reply added!");
        setReplyText("");
        setShowReplyForm(false);
        getAllComments();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to post reply.");
    }
  };

  const handleDeleteComment = async () => {
    try {
      await axiosInstance.delete(API_PATHS.COMMENTS.DELETE(commentId));
      toast.success("Comment deleted");
      getAllComments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete comment.");
    }
  };

  return (
    <div className="p-3 border rounded mb-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <img
          src={authorPhoto}
          alt={authorName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="font-medium">@{authorName}</span>
          <LuDot className="text-xs" />
          <span>{updatedOn}</span>
        </div>
      </div>

      <p className="text-sm text-gray-800 mt-2 mb-3">{content}</p>

      <div className="flex items-center gap-4 text-sm text-blue-500">
        {!isSubReply && (
          <>
            <button onClick={() => setShowReplyForm((prev) => !prev)}>
              <LuReply className="inline mr-1" />
              Reply
            </button>

            <button onClick={() => setShowSubReplies((prev) => !prev)}>
              {replies?.length || 0}{" "}
              {replies?.length === 1 ? "reply" : "replies"}
              <LuChevronDown
                className={`inline ml-1 transition-transform ${
                  showSubReplies ? "rotate-180" : ""
                }`}
              />
            </button>
          </>
        )}

        {user?.role === "admin" && (
          <button
            onClick={handleDeleteComment}
            className="text-red-500"
          >
            <LuTrash2 className="inline mr-1" />
            Delete
          </button>
        )}
      </div>

      {!isSubReply && post && (
        <div className="mt-4 flex items-center gap-4 bg-slate-50 p-2 rounded">
          <img
            src={post.coverImageUrl}
            alt="post cover"
            className="w-14 h-14 object-cover rounded"
          />
          <div className="text-sm">
            <h4 className="font-medium">{post.title}</h4>
          </div>
        </div>
      )}

      {!isSubReply && showReplyForm && (
        <div className="mt-4">
          <textarea
            rows="3"
            className="w-full p-2 border rounded text-sm"
            placeholder="Write your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="text-gray-600 text-sm"
              onClick={handleCancelReply}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
              onClick={handleAddReply}
            >
              Post
            </button>
          </div>
        </div>
      )}

      {showSubReplies &&
        replies?.length > 0 &&
        replies.map((reply) => (
          <div key={reply._id} className={`ml-6 mt-4 border-l pl-3`}>
            <CommentInfoCard
              commentId={reply._id}
              authorName={reply.author?.name}
              authorPhoto={reply.author?.profileImageUrl}
              content={reply.content}
              updatedOn={
                reply.updatedAt
                  ? moment(reply.updatedAt).format("Do MMM YYYY")
                  : "-"
              }
              post={post}
              replies={reply.replies || []}
              getAllComments={getAllComments}
              onDelete={onDelete}
              isSubReply={true}
            />
          </div>
        ))}
    </div>
  );
};

export default CommentInfoCard;
