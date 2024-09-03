


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import ListOfFriends from '../Profile/ListOfFriends';
// import SuggestedFriends from './SuggestedFriends';
// import './HomePageUser.css'

// const HomePageUser = () => {
//   const [profileData, setProfileData] = useState({});
//   const [groups, setGroups] = useState([]);
//   const currentUser = JSON.parse(localStorage.getItem('User'));
//   const userId = currentUser.userid;

//   useEffect(() => {
//     // Fetch groups data
//     axios.get(`http://localhost:8080/api/v1/users/${currentUser.userid}/groups`).then(response => {
//       setGroups(response.data);
//     });

//     // Fetch profile data and user posts
//     axios.get(`http://localhost:8080/api/v1/users/${currentUser.userid}`)
//       .then(response => {
//         setProfileData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching profile data:', error);
//       });
//   }, [currentUser.userid]);

//   return (
//     <div>
//       <Card className="user-profile-card" style={{backgroundColor:'#eff3f5',width:'80%',marginLeft:'-160%', marginTop:'-20%',borderRadius:'20px',boxShadow: '0 10px 10px 0 rgba(127, 99, 240, 0.3)'}}>
//         <Card.Img variant="top" src={profileData.profile_picture} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
//         <Card.Title style={{ fontFamily: 'cursive' }}>{profileData.username}</Card.Title>
//         <div className="list-group-item" style={{ fontFamily: 'cursive' }}>
//           <ListOfFriends /><br />
//           <small>Friends</small><br />
//           {groups.length}<br />
//           <small>Groups</small>
//         </div>
//       </Card>
      
//     </div>
//   );
// };

// export default HomePageUser;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListOfFriends from '../Profile/ListOfFriends';
import SuggestedFriends from './SuggestedFriends';
import './HomePageUser.css';

const HomePageUser = () => {
  const [profileData, setProfileData] = useState({});
  const [groups, setGroups] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('User'));
  const userId = currentUser.userid;

  useEffect(() => {
    // Fetch groups data
    axios.get(`http://localhost:8080/api/v1/users/${currentUser.userid}/groups`).then(response => {
      setGroups(response.data);
    });

    // Fetch profile data and user posts
    axios.get(`http://localhost:8080/api/v1/users/${currentUser.userid}`)
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, [currentUser.userid]);

  return (
    <div className="home-page-user">
      <div className="profile-section">
        <img src={profileData.profile_picture} alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <h2 className="username">{profileData.username}</h2>
          <div className="stats">
            <div className="stat">
              <span className="stat-count">{profileData.friends ? profileData.friends.length : 0}</span>
              <span className="stat-label">Friends</span>
            </div>
            <div className="stat">
              <span className="stat-count">{groups.length}</span>
              <span className="stat-label">Groups</span>
            </div>
          </div>
        </div>
      </div>
      <div className="friends-section">
        <h3>Friends</h3>
        <ListOfFriends />
      </div>
      <div className="suggested-friends-section">
        <h3>Suggested Friends</h3>
        <SuggestedFriends />
      </div>
    </div>
  );
};

export default HomePageUser;
