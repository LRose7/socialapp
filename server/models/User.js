const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      maxLength: 16,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    displayname: {
      type: String,
      trim: true,
      maxLength: 16,
    },
    location: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      maxLength: 300,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    coverPicture: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);
