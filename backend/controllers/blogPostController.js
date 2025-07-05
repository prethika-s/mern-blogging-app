const BlogPost = require('../models/BlogPost');
const mongoose = require('mongoose');

// @desc Create a new blog post
// @route POST /api/posts
// @access Admin

const createPost = async (req, res) => {
    try{
        const {title, content, coverImageUrl, tags, isDraft, generatedByAI} = req.body;

        const slug = title
            .toLowerCase()
            .replace(/ /g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/[^\w-]+/g, ''); // Remove leading/trailing hyphens

        const newPost = new BlogPost({
            title,
            slug,
            content,
            coverImageUrl,
            tags,
            author: req.user._id, // Assuming req.user is populated with the logged-in user's info
            isDraft,
            generatedByAI,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Error creating post', error: err.message });
    }
};

// @desc Update a blog post
// @route PUT /api/posts/:id
// @access Admin
const updatePost = async (req, res) => {
    try{
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if(
            post.author.toString() !== req.user._id.toString() && 
            !req.user.isAdmin
        ) {
            return res
                .status(403)
                .json({ message: 'Not authorized to update this post' });
        }

        const updatedData = req.body;
        if (updatedData.title) {
            updatedData.slug = updatedData.title
                .toLowerCase()
                .replace(/ /g, '-') // Replace spaces with hyphens
                .replace(/[^\w-]+/g, ''); // Remove non-alphanumeric characters
           }

        const updatedPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );
        res.json(updatedPost);
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Server Error', error: err.message });
    }
};

// @desc Delete a blog post
// @route DELETE /api/posts/:id
// @access Admin

const deletePost = async (req, res) => {
    try{
        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await post.deleteOne();
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Server Error', error: err.message });
    }
};

// @desc Get all blog posts
// @route GET /api/posts
// @access Public

const getAllPosts = async (req, res) => {
  try {
    const status = req.query.status || 'published'; // Default to 'published'
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Filter based on status
    let filter = {};
    if (status === 'published') {
      filter.isDraft = false;
    } else if (status === 'draft') {
      filter.isDraft = true;
    }

    // Fetch filtered paginated posts
    const posts = await BlogPost.find(filter)
      .populate('author', 'name profileImageURL')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count totals
    const [totalCount, allCount, publishedCount, draftCount] = await Promise.all([
      BlogPost.countDocuments(filter),
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ isDraft: false }),
      BlogPost.countDocuments({ isDraft: true }),
    ]);

    // ✅ FIXED: return counts (plural)
    res.json({
      posts,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      counts: { // ✅ changed from "count" to "counts"
        all: allCount,
        published: publishedCount,
        draft: draftCount,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc Get a blog post by slug
// @route GET /api/posts/slug/:slug
// @access Public

const getPostBySlug = async (req, res) => {
    try{
        const post = await BlogPost.findOne({ slug: req.params.slug })
            .populate('author', 'name profileImageURL'); // Populate author details

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
            res.json(post);
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Server Error', error: err.message });
    }
};

// @desc Get blog posts by tag
// @route GET /api/posts/tag/:tag
// @access Public

const getPostsByTag = async (req, res) => {
    try{
        const posts = await BlogPost.find({
            tags: req.params.tag,
            isDraft: false // Only fetch published posts
        }).populate('author', 'name profileImageURL'); // Populate author details
        res.json(posts);
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Server Error', error: err.message });
    }
};

// @desc Search blog posts
// @route GET /api/posts/search
// @access Public

const searchPosts = async (req, res) => {
    try{
        const q = req.query.q;
        const posts = await BlogPost.find({
            isDraft: false, // Only fetch published posts
            $or: [
                { title: { $regex: q, $options: 'i' } }, // Case-insensitive search in title
                { content: { $regex: q, $options: 'i' } }, 
            ],
        }).populate('author', 'name profileImageURL'); // Populate author details
        res.json(posts);
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Server Error', error: err.message });
    }
};

// @desc Increment view count for a post
// @route POST /api/posts/:id/view
// @access Public

const incrementView = async (req, res) => {
    try{
        await BlogPost.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } });
        res.status(200).json({ message: 'View count incremented' });
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Server Error', error: err.message });
    }
};

// @desc Like a blog post
// @route POST /api/posts/:id/like
// @access Public

const likePost = async (req, res) => {
    try{
        await BlogPost.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}});
        res.json({message: 'Post liked successfully'});
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Server Error', error: err.message });
    }
};

// @desc Get top trending posts
// @route GET /api/posts/trending
// @access Private

const getTopPosts = async (req, res) => {
    try{
        const posts = await BlogPost.find({ isDraft: false }) // Only fetch published posts
            .sort({ views: -1 }) // Sort by views, descending
            .limit(5) // Limit to top 5 posts

        res.json(posts);
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Server Error', error: err.message });
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPostBySlug,
    getPostsByTag,
    searchPosts,
    incrementView,
    likePost,
    getTopPosts
};


