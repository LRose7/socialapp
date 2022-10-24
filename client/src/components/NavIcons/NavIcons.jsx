import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Home, Comment } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to="../home">
        <Home/>
      </Link>
      <SettingsIcon/>
      <NotificationsIcon/>
      <Link to="../chat">
        <Comment/>
      </Link>
    </div>
  );
};

export default NavIcons;