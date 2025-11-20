const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog post
// @route   GET /api/blog/:id
// @access  Public
const getBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'username email');

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    // Get comments for this post
    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.json({ ...post.toObject(), comments });
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      message: error.message
    });
  }
};

// @desc    Create blog post
// @route   POST /api/blog
// @access  Private
const createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400);
      throw new Error('Please provide title and content');
    }

    const post = await BlogPost.create({
      title,
      content,
      author: req.user._id
    });

    const populatedPost = await BlogPost.findById(post._id)
      .populate('author', 'username email');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      message: error.message
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private
const updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this post');
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username email');

    res.json(updatedPost);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      message: error.message
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private
const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this post');
    }

    // Delete all comments associated with this post
    await Comment.deleteMany({ post: req.params.id });

    await BlogPost.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      message: error.message
    });
  }
};

module.exports = {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
};
