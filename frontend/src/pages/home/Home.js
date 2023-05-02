import React from 'react';
import './Home.css';

import PrimaryBar from '../../components/primaryBar/PrimaryBar';
import HomeProjects from '../../components/homeProjects/HomeProjects';
import HomeNotifications from '../../components/homeNotifications/HomeNotifications';

function Home() {
  return (
    <div className='home'>
        <PrimaryBar />
        <HomeProjects />
        <HomeNotifications />
    </div>
  )
}

export default Home