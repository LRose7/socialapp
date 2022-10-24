import React, { useState } from "react";
import "./Post.css";
import {
  Edit,
  DeleteForever,
  Comment,
  Share,
  Favorite,
} from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { likePost } from "../../redux/api/PostRequests";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post">
      <div className="postUser">
        <img
          src={
            user.profilePicture
              ? publicFolder + user.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="profileImage"
        />
        <div className="name">
          <b>{user.displayname}</b> @{user.username}
        </div>
      </div>
      <span className="timestamp">{format(data.createdAt)}</span>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
      <div className="postReact">
        {liked ? (
          <Favorite onClick={handleLike} />
        ) : (
          <FavoriteBorderIcon
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
        )}

        <Share style={{ cursor: "pointer" }} />
        <Comment style={{ cursor: "pointer" }} />
        <Edit style={{ cursor: "pointer" }} />
        <DeleteForever style={{ cursor: "pointer" }} />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
    </div>
  );
};

export default Post;
