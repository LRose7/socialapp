import React from "react";
import Center from "../../components/Center/Center";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />

      <div className="Profile-center">
        <ProfileCard location="profilePage" />
        <Center />
      </div>

      <RightSide />
    </div>
  );
};

export default Profile;
