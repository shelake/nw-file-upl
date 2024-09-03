import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidenav.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationPanel from '../Notifications/NotificationPanel';
import axios from 'axios';
import image from './VibleeLogo.jpg';

const Sidenav = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsCount, setNotificationCount] = useState(8);
  const currentUser = JSON.parse(localStorage.getItem('User'));
  const userId = currentUser?.userid;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}/notifications`);
        setNotificationCount(response.data.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const toggleNotifications = () => {
    if (notificationsCount > 0) {
      setNotificationCount(0);
    }
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="sidenav">
      <div className="sidenav__buttons">
        <div className="sidenav__logo" style={{ marginLeft: '-20px', position: 'fixed', top: '0', left: '0' }}>
          <img src={image} alt="Logo" style={{ width: '130px', height: '120px' }} />
        </div>
        <div style={{ paddingTop: "200%" }}>
          <NavLink to="/home" className="sidenav__button" title="Home">
            <HomeIcon style={{ color: '#8E7AB5', width: '30px', height: '30px' }} />
          </NavLink>
          <NavLink to="/profile" className="sidenav__button" title="Profile">
            <AccountCircleIcon style={{ color: '#3377FF', width: '30px', height: '30px' }} />
          </NavLink>
          <NavLink to="/message" className="sidenav__button" title="Message">
            <ChatIcon style={{ color: '#C81472', width: '30px', height: '30px' }} />
          </NavLink>
          <div style={{ width: '30px', height: '30px' }}>
            <NavLink className="sidenav__button relative" onClick={toggleNotifications} title="Notifications">
              <div className="badge-container">
                {notificationsCount > 0 && <span className="notification-badge">{notificationsCount}</span>}
              </div>
              <NotificationsIcon style={{ color: "#ffbf00", paddingLeft: '5px', width: '30px', height: '30px' }} />
            </NavLink>
          </div>
          <NavLink to="/friends" className="sidenav__button" title="Friends">
            <PeopleAltIcon style={{ color: '#7D0A9F', width: '30px', height: '30px' }} />
          </NavLink>
          <NavLink to="/group" className="sidenav__button" title="Group">
            <GroupsIcon style={{ color: '#09D007', width: '30px', height: '30px' }} />
          </NavLink>
          <NavLink to="/createPost" className="sidenav__button" title="Create">
            <AddCircleOutlineIcon style={{ color: '#FF9800', width: '30px', height: '30px' }} />
          </NavLink>
        </div>
      </div>
      <div className="sidenav__more">
        <button className="sidenav__button" title="SignOut">
          <PowerSettingsNewIcon style={{ color: '#FF0000' }} />
        </button>
      </div>
      <NotificationPanel isOpen={showNotifications} toggleNotifications={toggleNotifications} />
    </div>
  );
};

export default Sidenav;
