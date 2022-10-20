import React, { useState } from "react";
import "./RightSide.css";
import NavIcons from "../NavIcons/NavIcons";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      {/* Side Navbar */}
      <NavIcons />

      {/* Trend Card */}
      <TrendCard />

      {/* Share Button */}
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
