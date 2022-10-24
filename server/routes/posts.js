const router = require("express").Router();
const mongoose = require("mongoose");

// Load Post & User models
const Post = require("../models/Post.js");
const User = require("../models/User.js");

// @route   POST /posts/
// @desc    Create a post
// @access  Private
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// @route   GET /posts/:id
// @desc    Get a post
// @access  Private
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// @route   PUT /posts/:id
// @desc    Update a post
// @access  Private
router.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated!");
    } else {
      res.status(403).json("Authentication Failed");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// @route   DELETE /posts/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Your Post was successfully deleted!");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// @route   PUT /posts/:id/like
// @desc    like/dislike a post
// @access  Private
router.put("/:id/like", async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// @route  GET /posts/:id/timeline
// @desc    Get timeline posts
// @access  Private
router.get("/:id/timeline", async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await Post.find({ userId: userId });
    const followingPosts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
