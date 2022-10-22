import React, { useEffect, useState } from 'react';
import './Post.css';
import Comment from '../../images/comment.png';
import Share from '../../images/share.png';
import Heart from '../../images/like.png';
import NotLike from '../../images/notlike.png';
import { likePost } from "../../api/PostRequests";
import { useSelector } from "react-redux";
import axios from 'axios';
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

const Post = ({ data }) => {
  const { user, setUser } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

  
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };

  // useEffect(() => {
  //   try {
  //     const fetchUser = aysnc () => {
  //       const res = await 
  //     }
  //   } catch (e) {
      
  //   }
  // })

  return (
    <div className="Post">
      {/* <div className="PostUser">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt=""
      />
      <div>
       <b>{user.firstname} {user.lastname}</b>
       @{user.username}
      </div>
      </div> */}
        <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />
        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
        <div className="postReact">
            <img src={liked ? Heart : NotLike} 
            alt="" 
            style={{ cursor: "pointer" }}
            onClick={handleLike}
            />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>
        <span style={{color: "var(--gray)", fontSize:"12px"}}>{likes} likes</span>
    </div>
  )
}

export default Post