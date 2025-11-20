const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('user', 'username email').sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('user', 'username email');

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    res.json(project);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      message: error.message
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, imageUrl, repoUrl, liveUrl } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Please provide title and description');
    }

    const project = await Project.create({
      title,
      description,
      imageUrl,
      repoUrl,
      liveUrl,
      user: req.user._id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      message: error.message
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    // Check if user is the owner
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this project');
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      message: error.message
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    // Check if user is the owner
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this project');
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      message: error.message
    });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
