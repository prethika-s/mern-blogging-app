const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// @desc Add a comment to a blog post
// @route POST /api/comments/:postId
// @access Private
const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content, parentComment } = req.body;

        const post = await BlogPost.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        const comment = await Comment.create({
            post: postId,
            author: req.user._id,
            content,
            parentComment: parentComment || null,
        });

        await comment.populate('author', 'name profileImageUrl');

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add comment', error: err.message });
    }
};

// @desc Get all comments for a blog post
// @route GET /api/comments/
// @access Public
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('author', 'name profileImageUrl')
            .populate('post', 'title')
            .sort({ createdAt: -1 });

        const commentMap = {};
        const commentList = comments.map(comment => {
            comment = comment.toObject();
            comment.replies = [];
            commentMap[comment._id] = comment;
            return comment;
        });

        const nestedComments = [];
        commentList.forEach(comment => {
            if (comment.parentComment) {
                const parent = commentMap[comment.parentComment];
                if (parent) {
                    parent.replies.push(comment);
                }
            } else {
                nestedComments.push(comment);
            }
        });

        res.json(nestedComments);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
    }
};

// @desc Get all comments for a blog post
// @route GET /api/comments/:postId
// @access Public
const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId })
            .populate('post', 'title coverImageUrl')
            .populate('author', 'name profileImageUrl')
            .sort({ createdAt: -1 });

        const commentMap = {};
        comments.forEach(comment => {
            comment = comment.toObject();
            comment.replies = [];
            commentMap[comment._id] = comment;
        });

        const nestedComments = [];
        comments.forEach(comment => {
            if (comment.parentComment) {
                const parent = commentMap[comment.parentComment];
                if (parent) {
                    parent.replies.push(comment);
                }
            } else {
                nestedComments.push(comment);
            }
        });

        res.json(nestedComments);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
    }
};

// @desc Delete a comment
// @route DELETE /api/comments/:commentId
// @access Private
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await Comment.deleteOne({ _id: commentId });

        await Comment.deleteMany({ parentComment: commentId });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete comment', error: err.message });
    }
};

module.exports = {
    addComment,
    getAllComments,
    deleteComment,
    getCommentsByPost
};
