import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import MessagePage from './Components/Message/MessagePage';
import Login from './Components/LoginPage/Login';
import Profile from './Components/Profile/Profile';
import UserProfile from './Components/Profile/UserProfile';
import NotificationPanel from './Components/Notifications/NotificationPanel';
import CreateCard from './Components/CreatePost/CreatePost';
import ChatHome from './Components/Message/ChatHome';
import GroupPage from './Components/Group/GroupPage';
import Friends from './Components/Friends/Friends';
import Mode from './Components/Mode/Mode';
import FriendList from './Components/Friends/Friends';
import SearchBar from './Components/SearchBar/SearchBar';
import SuggestedFriends from './Components/HomePage/SuggestedFriends';
import NavScrollExample from './Components/NavBar/NavBar';
import Sidenav from './Components/NavBar/Sidenav';
import PostProper from './Post/PostProper';
import HomePageUser from './Components/HomePage/HomePageUser';
import ChatGridHome from './Components/Message/ChatGridHome';

// Create a custom component that will handle the navigation and side navigation
const Navigation = () => {
  // Use the useLocation hook here
  const location = useLocation();

  // Function to determine if navbar and sidenav should be displayed
  const showNavAndSideNav = () => {
    // Check if the current route is not the login page
    return location.pathname !== '/';
  };

  return (
    <>
      {/* Conditionally render navbar and sidenav */}
   
      {showNavAndSideNav() && <Sidenav />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      {/* Render the Navigation component */}
    
      <Navigation />
      

      {/* Define routes */}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/notif" element={<NotificationPanel />} />
        <Route path="/message" element={<ChatGridHome />} />
        <Route path="/message1" element={<MessagePage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/createPost" element={<CreateCard />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/friends" element={<FriendList />} />
        <Route path="/profile/:friendId" element={<Profile />} />
        <Route path="/searchuser" element={<SearchBar />} />
        <Route path="/suggestedfriends" element={<SuggestedFriends />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
