import React from 'react';
import PostSide from '../../components/Postside/PostSide';
import ProfileSide from '../../components/profileSide/ProfileSide';
import './Home.css';

const home = () => {
  return (
    <div className="Home">
        <ProfileSide />
        <PostSide />
        <div className="rightSide">Rightside</div>
    </div>
  )
}

export default home