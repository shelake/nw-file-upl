// Import React and useState from react
import React, { useState, useEffect } from 'react';
// Import the CSS file
import './Friends.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMessage, AiOutlineDelete } from 'react-icons/ai'; // Import message and trash icons
import { BsPersonFillAdd } from "react-icons/bs";
import { BiSolidUserCheck } from "react-icons/bi";

// Import Carousel component from react-responsive-carousel
import { Carousel } from 'react-responsive-carousel';
// Import CSS for react-responsive-carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Profile from '../Profile/Profile';

// Friend component
function Friend({ name, profilePic, userId, friendId ,onClick }) {
  // Function to handle messaging a friend
  // Get the history object

  // Function to handle removing a friend
  const handleRemoveFriend = () => {
    // Logic to remove the friend from the friend list
    console.log(`Removing ${name} from friend list`);
    // Make API call to remove friend
    axios.delete(`http://localhost:8086/api/v1/users/${userId}/friends/${friendId}`)
      .then(response => {
        console.log(response.data); // Assuming the backend returns a success message
        // Optionally, update state to reflect the removal of the friend
      })
      .catch(error => {
        console.error('Error removing friend:', error);
      });
  };

  return (
    <div className="card" onClick={onClick} style={{width:'60%',height:'120%'}}>
      <img src={profilePic} alt={`${name}'s profile`} style={{height:'80px',width:'80px',borderRadius:'50%'}}/>
      <h3>{name}</h3>
      <div className="button mt-2 d-flex flex-row align-items-center">
        {/* Button to message the friend */}
        <NavLink to={`/message`} className={`btn btn-sm btn-info w-100 ml-2 message`} activeClassName="active" title='Message'>
          <AiOutlineMessage /> {/* Replace text with message icon */}
        </NavLink>
       
        {/* Button to remove the friend */}
        <button onClick={handleRemoveFriend} className="btn btn-sm btn-danger w-100 ml-2 remove">
          <AiOutlineDelete /> {/* Replace text with trash icon */}
        </button>
      </div>
    </div>
  );
}

// PendingRequest component
function PendingRequest({ name, profilePic, userId, otherUserId, friendshipId ,onClick}) {
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);
  console.log(otherUserId);
  const handleAccept = () => {
    // Handle accept logic here
    console.log(`${name} accepted!`);
    setAccepted(true);
    setDeclined(false); // Reset decline state
    axios.put(`http://localhost:8086/api/v1/users/${otherUserId}/friends/${friendshipId}/${userId}`)
      .then(response => {
        console.log(response.data); // Assuming the backend returns a success message
      })
      .catch(error => {
        console.error('Error accepting friend request:', error);
      });
  };

  const handleDecline = () => {
    // Handle decline logic here
    console.log(`${name} declined!`);
    setAccepted(false); // Reset accept state
    setDeclined(true);
    axios.delete(`http://localhost:8086/api/v1/users/${otherUserId}/friends/${userId}`)
      .then(response => {
        console.log(response.data); // Assuming the backend returns a success message
      })
      .catch(error => {
        console.error('Error accepting friend request:', error);
      });
  };

  return (
    <div className="card" onClick={onClick}>
      <img src={profilePic} alt={`${name}'s profile`} />
      <h3>{name}</h3>
      <div className="button mt-2 d-flex flex-row align-items-center">
        <button onClick={handleAccept} className={`btn btn-sm btn-outline-primary w-100 accept ${accepted ? 'active' : ''}`}>
          Accept
        </button>
        <button onClick={handleDecline} className={`btn btn-sm btn-primary w-100 ml-2 decline ${declined ? 'active' : ''}`}>
          Decline
        </button>
      </div>
    </div>
  );
}

// FriendSuggestion component
function FriendSuggestion({ name, profilePic, userId, otherUserId ,onClick, currentUsername}) {
  // State to track if the request has been sent
  const [requestSent, setRequestSent] = useState(false);

  // Function to handle sending friend request
  const handleSendRequest = () => {
    // Send request to backend to send friend request
    axios.post(`http://localhost:8086/api/v1/users/${userId}/friendrequest/send/${otherUserId}`)
      .then(response => {
        console.log(response.data); // Assuming the backend returns a success message
        setRequestSent(true); // Update state to indicate request sent

        // Send notification to the user who receives the friend request
        const notificationData = `User ${currentUsername} sent you a friend request.`
        
        axios.post(`http://localhost:8086/api/v1/users/${otherUserId}/notifications`, notificationData)
          .then(response => {
            console.log(response.data); // Assuming the backend returns a success message
          })
          .catch(error => {
            console.error('Error sending friend request notification:', error);
          });
      })
      .catch(error => {
        console.error('Error sending friend request:', error);
      });
  };

  // Function to handle cancelling friend request
  const handleCancelRequest = () => {
    // Cancel request in backend
    axios.delete(`http://localhost:8086/api/v1/users/${userId}/friends/${otherUserId}`)
      .then(response => {
        console.log(response.data); // Assuming the backend returns a success message
        setRequestSent(false); // Update state to indicate request cancelled
      })
      .catch(error => {
        console.error('Error cancelling friend request:', error);
      });
  };

  return (
    <div className="card"  onClick={onClick}>
      <img src={profilePic} alt={`${name}'s profile`}  style={{width:'80px', height:'80px',borderRadius:'50%'}}/>
      <h3>{name}</h3>
      <div className="button mt-2">
        {/* Render button based on request status */}
        {!requestSent ? (
          <button
            onClick={handleSendRequest}
            className="btn btn-sm btn-primary w-100 send-request"
           >
            <BsPersonFillAdd  style={{backgroundColor:'white',color:'black',height:'20px',width:'20px'}} />
          </button>
        ) : (
          <button
            onClick={handleCancelRequest}
            className="btn btn-sm btn-success w-100 send-request"
          >
            <BiSolidUserCheck style={{backgroundColor:'white',color:'green',height:'20px',width:'20px'}} />
          </button>
        )}
      </div>
    </div>
  );
}

// Main component
function FriendList() {
  // Sample data for friends, pending requests, and friend suggestions
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const navigate = useNavigate(); 
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('User'));
  const userId = currentUser.userid;
  const handleSelectFriend = (friendId) => {
    setSelectedFriendId(friendId);
    navigate(`/profile/${friendId}`); // Navigate to the profile page with the friend's ID
  };


  useEffect(() => {
    // Fetch friends
    axios.get(`http://localhost:8086/api/v1/users/${userId}/friends`)
      .then(response => {
        setFriends(response.data);
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
      });

    // Fetch pending requests
    axios.get(`http://localhost:8086/api/v1/users/${userId}/friendrequest/pending`)
      .then(response => {
        setPendingRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching pending requests:', error);
      });

    // Fetch friend suggestions
    axios.get(`http://localhost:8086/api/v1/users/random/${userId}`)
      .then(response => {
        setFriendSuggestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching friend suggestions:', error);
      });
  }, []);

  return (
    <div>
    {/* <div className='friend-container'> */}
      <Carousel showThumbs={false}>
        <div className="container mt-5 d-flex justify-content-center" style={{marginLeft:'28%',width:'50%',height:'80%',backgroundColor:'#eff3f5',borderRadius: '20px', boxShadow: '0 10px 10px rgba(127, 99, 240, 0.3)'}} >
          {/* <div className="friends-list" style={{backgroundColor:'blue'}}> */}
          
            <h2 style={{marginBottom:'10%',marginTop:'-20%'}}>Friends</h2>
            <div className="friends center" style={{marginLeft:'-40%'}}>
              {friends.map((friend, index) => (
                <div key={index} onClick={() => setSelectedFriendId(friend.userid2)}>
                 
                <Friend key={index} name={friend.user2name} profilePic={friend.user2Profile} userId={friend.userid1} friendId={friend.userid2} onClick={() => setSelectedFriendId(friends.userid2)}/></div>
              ))}
            </div>
          {/* </div> */}
        </div>

        <div className="container mt-5 d-flex justify-content-center">
          <h2>Pending Requests</h2>
          <div className="pending-requests" >
            {pendingRequests.map((request, index) => (
              <div key={index} onClick={() => setSelectedFriendId(pendingRequests.userid1)} style={{width:'40px',height:'50px'}}>
           
              <PendingRequest key={index} name={request.user1name} profilePic={request.user1Profile} userId={userId} otherUserId={request.userid1} friendshipId={request.friendshipid} />
              </div>
              
            ))}
          </div>
        </div>
         
              <div className="container mt-5 d-flex justify-content-center" style={{marginLeft:'28%',marginBottom:'10%',width:'50%',height:'90%',backgroundColor:'#eff3f5',borderRadius: '20px', boxShadow: '0 10px 10px rgba(127, 99, 240, 0.3)'}} >
          {/* <div className="friends-list" style={{backgroundColor:'blue'}}> */}
          
            <h2 style={{marginBottom:'10%',marginTop:'-20%'}}>Friends Suggestion</h2>
            <div className="friends center" style={{marginLeft:'-40%'}}>
            {friendSuggestions.map((suggestion, index) => (
              <div key={index} onClick={() => setSelectedFriendId(suggestion.userid)} style={{marginLeft:'-20%'}}>
              <FriendSuggestion key={index} name={suggestion.username} profilePic={suggestion.profile_picture} userId={userId} otherUserId={suggestion.userid} currentUsername= {currentUser.username}/>
            </div> ))}
            </div>
          {/* </div> */}
        </div>
      </Carousel>
    {/* </div> */}
    {selectedFriendId && <Profile friendId={selectedFriendId} />}</div>
  );
}

export default FriendList;
