import React from 'react';
import Center from '../../components/Center/Center';
import LeftSide from '../../components/LeftSide/LeftSide';
import RightSide from '../../components/RightSide/RightSide';
import './Home.css';

const Home = () => {
  return (
    <div className="Home">
        <LeftSide />
        <Center />
        <RightSide />
    </div>
  )
}

export default Home;