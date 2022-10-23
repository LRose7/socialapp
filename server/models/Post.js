const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: { 
      type: String, 
      required: true 
    },
    desc: {
      type: String,
      max: 500, 
      required : true
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = Post = mongoose.model("posts", PostSchema);