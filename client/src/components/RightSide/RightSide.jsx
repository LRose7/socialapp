import React, { useState } from "react";
import "./RightSide.css";
import NavIcons from "../NavIcons/NavIcons";
import FollowersCard from "../FollowersCard/FollowersCard";


const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      {/* Side Navbar */}
      <NavIcons />
      
    <FollowersCard />
    
    
    </div>
  );
};

export default RightSide;
