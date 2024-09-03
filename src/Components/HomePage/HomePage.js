import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import Sidenav from '../NavBar/Sidenav';
import HomePageUser from './HomePageUser';
import './HomePage.css'; // Import your CSS file for styling
import CreateCard from '../CreatePost/CreatePost';
import PostProper from '../../Post/PostProper';
import SuggestedFriends from './SuggestedFriends';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (




        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <div className='col-3'>
                <HomePageUser />
              </div>
              <div>
                <SuggestedFriends />
              </div>
            </div>
            <div className='col-6'>
              <PostProper />
            </div>
          </div>

          {/* */}
          {/* */}
        </div>










      )}
    </div>
  );
};

export default HomePage;
