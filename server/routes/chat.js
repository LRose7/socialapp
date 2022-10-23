const router = require("express").Router();

// Load Chat model
const Chat = require("../models/Chat");

// @route   POST /chat/
// @desc    Create a chat
// @access  Private
router.post("/", async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
});

// @route   get /chat/:userId
// @desc    get a user's chat
// @access  Private
router.get("/:userId", async (req, res) => {
    try {
        const chat = await Chat.find({
            members: { $in: [req.params.userId] }
        });
        res.status(200).json(chat);
    } catch (e) {
        res.status(500).json(e);
    }
});

// @route   get /chat/find/:firstId/:secondId
// @desc    finding a specific chat with a specific person
// @access  Private
router.get("/find/:firstId/:secondId", async (req, res) => {
    try {
        const chat = await Chat.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        });
        res.status(200).json(chat);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;
