const router = require("express").Router();

// Load Message model
const Message = require("../models/Message");

// @route   POST /message/
// @desc    add a message
// @access  Private
router.post("/", async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new Message({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
});

// @route   GET /message/:chatId
// @desc    get messages
// @access  Private
router.get("/:chatId", async (req, res) => {
    const { chatId } = req.params;
    try {
        const result = await Message.find({
            chatId
        });
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;
