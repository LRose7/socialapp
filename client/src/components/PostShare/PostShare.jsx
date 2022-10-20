import React, { useState, useRef } from "react";
import "./PostShare.css";
import ProfileImage from "../../images/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction.js";

const PostShare = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const desc = useRef();
  const {user} = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // Handle Image Change
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef ();

  // Handle Post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    // Post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    };
    // If there is an image with a post
    if(image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };

  // Reset share post
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };

  return (
    <div className="PostShare">
      <img src={
        user.profilePicture
        ? serverPublic + user.profilePicture
        : ProfileImage        
        } 
        alt="" 
      />
      <div>
        <input 
        type="text" 
        placeholder="What's happening" 
        ref={desc}
        required
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>

          <button 
          className="button ps-button"
          onClick={handleUpload}
          disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
            <div className="previewImage">
                <UilTimes style={{color: "var(--orange)"}} onClick={()=>setImage(null)}/>
                <img src={URL.createObjectURL(image)} alt="preview" />
            </div>
        )}

      </div>
    </div>
  );
};

export default PostShare;
