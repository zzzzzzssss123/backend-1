const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// @desc    Get all comments for a blog post
// @route   GET /api/blog/:postId/comments
// @access  Public
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create comment
// @route   POST /api/blog/:postId/comments
// @access  Private
const createComment = async (req, res) => {
  try {
    const { body } = req.body;

    if (!body) {
      res.status(400);
      throw new Error('Please provide comment body');
    }

    // Check if post exists
    const post = await BlogPost.findById(req.params.postId);
    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    const comment = await Comment.create({
      body,
      author: req.user._id,
      post: req.params.postId
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username email');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      message: error.message
    });
  }
};

module.exports = {
  getComments,
  createComment
};
