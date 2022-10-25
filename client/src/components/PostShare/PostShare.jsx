import React, { useState, useRef } from "react";
import "./PostShare.css";
import VideocamIcon from "@mui/icons-material/Videocam";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from '@mui/icons-material/Close';
// import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../redux/actions/UploadAction.js";

const PostShare = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // Handle Image Change
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  // Handle Post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    // Post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    // If there is an image with a post
    if (image) {
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
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt=""
      />
      <div>
        
        <input type="text" placeholder="What's happening" ref={desc} required />

        <div className="postOptions">
          <div className="option">
            <AddAPhotoIcon
              style={{ cursor: "pointer", fontSize: "22px" }}
              onClick={() => imageRef.current.click()}
            />
          </div>

          <div className="option">
            <VideocamIcon />
          </div>
          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>
        </div>

        <div style={{ display: "none" }}>
          <input type="file" ref={imageRef} onChange={onImageChange} />
        </div>
      </div>

      {image && (
        <div className="previewImage">
          <CloseIcon 
          onClick={() => setImage(null)}
          />
          <img src={URL.createObjectURL(image)} alt="preview" />
        </div>
      )}
    </div>
  );
};

export default PostShare;
