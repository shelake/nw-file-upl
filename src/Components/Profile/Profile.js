import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Height } from '@mui/icons-material';
import image1 from './ImagePost1.jpg';
import ListOfFriends from './ListOfFriends';
import {useNavigate} from 'react-router-dom';


const Profile = ({friendId}) => {
  const [profileData, setProfileData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  

  useEffect(() => {
    // Fetch profile data from the backend
    const currentUser = JSON.parse(localStorage.getItem('User'));
    console.log(currentUser)
    axios.get(`http://localhost:8086/api/v1/users/${friendId}`) // Assuming user ID is 1
      .then(response => {
        setProfileData(response.data);
        // Fetch user's posts
        return axios.get(`http://localhost:8086/api/v1/users/posts/${friendId}`);
      })
      .then(postsResponse => {
        setUserPosts(postsResponse.data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);
  return (
    <div>
    <div class="container"><div class="container mt-5 flex justify-content-center" style={{width:"70%"}}>

    <div class="card p-3">

        <div class="d-flex align-items-center">

            <div class="image">
        {/* <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="155" /> */}
         {profileData.profile_picture==null ? 
           <img src={image1} width="145"height="145"  style={{borderRadius:"50%"}}/>:<img src={profileData.profile_picture} width="145"height="145"  style={{borderRadius:"50%"}}/>}
            
      
        {/* <img src={profileData.profile_picture} width="145"height="145"  style={{borderRadius:"50%"}}/>} */}
        {/* <center><a href="#" class="btn btn-outline-dark btn-sm btn-block">Edit profile</a></center> */}
        
        </div>
&nbsp;&nbsp;&nbsp;
        <div class="ml-3 w-100">
            
           <h4 class="mb-0 mt-0" style={{fontFamily:"revert-layer"}}>{profileData.username}</h4>
           <span>Senior Journalist</span>

           <div class="p-2 mt-2 d-flex justify-content-between rounded text-black stats">

            <div class="d-flex flex-column" >

                <span class="posts" style={{fontFamily:"cursive"}}>Posts</span>
                <span class="number1">{userPosts.length}</span>
                
            </div>

            <div class="d-flex flex-column">

            <span class="friends"style={{fontFamily:"cursive"}}>Friends</span>
                <a href="#" class="btn  btn-sm btn-block"><div><ListOfFriends/></div></a>
                
            </div>


            <div class="d-flex flex-column">

                <span class="groups"style={{fontFamily:"cursive"}}>Groups</span>
                <span class="number3">8.9</span>
                
            </div>
               
           </div>


           <div class="button mt-2 d-flex flex-row align-items-center">

            <button class="btn btn-sm btn-outline-primary w-100">Chat</button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-primary w-100 ml-2">Follow</button>

               
           </div>


        </div>

            
        </div>
        
    </div>
     
 </div>
 <div>
 </div>
  <div class="py-4 px-4"> 
     <div class="d-flex align-items-center justify-content-between mb-3">
        
            <a href="#" class="btn btn-link text-muted">Show all</a> 
            </div>
            <div>
 <h4><center>Recent Post</center></h4></div>

       <div class="row"> 
       {/* <div class="col-lg-6 mb-2 pr-lg-1"><img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm"/>
                         </div> <div class="col-lg-6 mb-2 pl-lg-1">
                            <img src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm"/></div>
                             <div class="col-lg-6 pr-lg-1 mb-2">
                                <img src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" class="img-fluid rounded shadow-sm"/></div> <div class="col-lg-6 pl-lg-1">
                                <img src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm"/>
       </div>  */}
        <div className="mt-5">
        
        <div className="row">
          {userPosts.map((postArray, index) => (
            <div key={index} className="col-md-6">
              <div className="card" >
                <img src={postArray.post_picture} className="card-img-top" height={"400"}  />
               
                 
                </div>
              </div>
           
       ))}
     </div>
  
 </div>

                                
 
 
 </div>
 </div>
 </div></div>
  )
}

export default Profile