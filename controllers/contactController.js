const Message = require('../models/Message');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const contactMessage = await Message.create({
      name,
      email,
      message
    });

    res.status(201).json({
      message: 'Message sent successfully',
      data: contactMessage
    });
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      message: error.message
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin only)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitContact,
  getMessages
};
