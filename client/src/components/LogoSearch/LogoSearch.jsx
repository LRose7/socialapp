import React from "react";
import "./LogoSearch.css";
import Logo from "../../images/logo3.PNG";
import SearchIcon from '@mui/icons-material/Search';

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="Logo" style={{width: "3rem", borderRadius: "50%"}}/>
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <SearchIcon/>
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;