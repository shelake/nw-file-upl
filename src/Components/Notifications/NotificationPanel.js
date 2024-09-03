import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotificationPanel.css';
import bg from './bg3.jpg';

const NotificationPanel = ({ isOpen, toggleNotifications }) => {
    const [notifications, setNotifications] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('User'));
  const userId = currentUser.userid;

    useEffect(() => {
        // Function to fetch notifications
        const fetchNotifications = async () => {
            try {
                // Make GET request to fetch notifications
                const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}/notifications`);
                // Set notifications in state
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Call fetchNotifications function when component mounts
        fetchNotifications();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div className='notification-container'>
            <div className={`notifications-panel ${isOpen ? 'open' : ''}`} style={{ background: bg }}>
                <div className="notifications-panel__header" >
                    <h4 style={{ fontFamily: "sans-serif" }}>Notifications</h4>
                    <button className="close-button" onClick={toggleNotifications}>
                        &times;
                    </button>
                </div>
                <div className="notifications-panel__content">
                    {notifications.map((notification) => (
                        <div key={notification.notificationID} className="notification">
                            <span className='' style={{ marginRight: "5px", fontWeight: "100", fontStyle: "revert-layer" }}>{notification.content}</span>
                            <span style={{ fontWeight: "50" }}>{notification.timestamp}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationPanel;
