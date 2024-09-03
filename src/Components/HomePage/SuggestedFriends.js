import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './SuggestedFriends.css';
import axios from 'axios';
import Profile from '../Profile/Profile';



  
  // Main component
  function SuggestedFriends() {
    // Sample data for friends, pending requests, and friend suggestions
    const [selectedFriendId, setSelectedFriendId] = useState(null);
  
  
    const [friendSuggestions, setFriendSuggestions] = useState([]);
   
    const currentUser = JSON.parse(localStorage.getItem('User'));
    const userId = currentUser.userid;
    const handleSelectFriend = (friendId) => {
      setSelectedFriendId(friendId);
      // Navigate to the profile page with the friend's ID
    };
  
  
    useEffect(() => {
      // Fetch friends
  
      // Fetch friend suggestions
      axios.get(`http://localhost:8080/api/v1/users/random/${userId}`)
        .then(response => {
          setFriendSuggestions(response.data);
        })
        .catch(error => {
          console.error('Error fetching friend suggestions:', error);
        });
    }, []);
 

  return (

    <Card style={{backgroundColor:'#eff3f5',width:'100%',height:'100%',marginLeft: '-170%',marginTop:'30%' ,marginRight: '40%', boxShadow: '0 10px 10px 0 rgba(127, 99, 240, 0.3)',borderRadius:'20px'}}>
      <Card.Header style={{backgroundColor:'#eff3f5',textAlign: 'center'}}>
        Friends
      </Card.Header>
      <Card.Body>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {friendSuggestions.map((suggestion, index) => (
            <div key={index} onClick={() => setSelectedFriendId(suggestion.userid)} style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={suggestion.profile_picture} style={{ width: '50px', height: '50px', borderRadius: '50%' }}/>
            </div>
          ))}
        </div>
        {selectedFriendId && <Profile friendId={selectedFriendId} />}
      </Card.Body>
    </Card>
    // <Card>
    //   <Card.Header>
    //     Friends
    //   </Card.Header>
    //   <Card.Body>
    //     <div className="friends-grid">
       

    //     {friendSuggestions.map((suggestion, index) => (
    //           <div key={index} onClick={() => setSelectedFriendId(suggestion.userid)}>
              
    //           <img src={suggestion.profile_picture} className="friend-avatar"/>
    //           </div>
    //         ))}
          
    //       {selectedFriendId && <Profile friendId={selectedFriendId} />}
        
    //     </div>
    //   </Card.Body>
    // </Card>
  );
}
 
export default SuggestedFriends;