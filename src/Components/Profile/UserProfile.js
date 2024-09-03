import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfile from './EditProfile';
import image1 from './ImagePost1.jpg';
import ListOfFriends from './ListOfFriends';
import PostCommentModal from './PostCommentModal';

const UserProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('User'));
  const userId = currentUser.userid;

  useEffect(() => {
    // Fetch profile data from the backend
    axios.get(`http://localhost:8080/api/v1/users/${currentUser.userid}`)
      .then(response => {
        setProfileData(response.data);
        // Fetch user's posts
        return axios.get(`http://localhost:8080/api/v1/users/posts/${currentUser.userid}`);
      })
      .then(postsResponse => {
        setUserPosts(postsResponse.data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, [userId]);

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/post/delete/${postId}`);
      setUserPosts(userPosts.filter(post => post.postId !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="container mt-5 flex justify-content-center" style={{ width: "70%" }}>
          <div className="card p-3">
            <div className="d-flex align-items-center">
              <div className="image">
                <a href="#" className="btn btn-sm btn-block"><EditProfile userId={userId} /></a>
                {profileData.profile_picture == null ?
                  <img src={image1} width="145" height="145" style={{ borderRadius: "50%" }} /> :
                  <img src={profileData.profile_picture} width="145" height="145" style={{ borderRadius: "50%" }} />}
              </div>
              &nbsp;&nbsp;&nbsp;
              <div className="ml-3 w-100">
                <h4 className="mb-0 mt-0" style={{ fontFamily: "revert-layer" }}>{profileData.username}</h4>
                <span>Senior Journalist</span>
                <div className="p-2 mt-2 d-flex justify-content-between rounded text-black stats">
                  <div className="d-flex flex-column" >
                    <span className="posts" style={{ fontFamily: "cursive" }}>Posts</span>
                    <span className="number1">{userPosts.length}</span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="friends" style={{ fontFamily: "cursive" }}>Friends</span>
                    <a href="#" className="btn btn-sm btn-block"><div><ListOfFriends /></div></a>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="groups" style={{ fontFamily: "cursive" }}>Groups</span>
                    <span className="number3">8.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 px-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <a href="#" className="btn btn-link text-muted">Show all</a>
        </div>
        <div>
          <h4><center>Recent Post</center></h4>
        </div>
        <div className="row">
          {userPosts.map((postArray, index) => (
            <div key={index} className="col-md-6">
              <div className="card" >
                <img src={postArray.post_picture} className="card-img-top" height={"400"} alt={`Post ${index}`} />
                <PostCommentModal />
                <button className="btn btn-danger mt-2" onClick={() => deletePost(postArray.postId)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
