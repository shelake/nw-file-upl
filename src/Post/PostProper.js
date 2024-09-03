// import React, { useEffect, useState } from 'react';
// import './PostProper.css';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import { BsChatLeftQuote } from "react-icons/bs";
// import { FaComment, FaThumbsUp } from 'react-icons/fa';

// import CommentModal from '../Components/Comment/CommentModal';

// const PostProper = (props) => {
    
//     const [allPosts, setAllPosts] = useState([]);
//     const [postText, setPostText] = useState('');
//     const [newNotification, setnewNotifications]=useState('');
//     const [profileData, setProfileData] = useState({});
//     const [showCommentModal, setShowCommentModal] = useState(null); // Define the showCommentModal state with null initially
//     const [likedPosts, setLikedPosts] = useState([]); // State to track liked posts
//     const currentUser = JSON.parse(localStorage.getItem('User'));
//     const userId = currentUser.userid;

//     useEffect(() => {
//         // Fetch posts and set likedPosts when component mounts
//         fetchPosts();
    
//         // Fetch liked posts for the current user
//         const fetchLikedPosts = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8086/api/v1/users/${userId}/likes`);
//                 const likedPostsData = response.data.map(like => like.postId);
//                 setLikedPosts(likedPostsData);
//             } catch (error) {
//                 console.error('Error fetching liked posts:', error);
//             }
//         };
    
//         fetchLikedPosts();
//     }, []);
//     const fetchPosts = async () => {
//         try {
//             // Fetch all posts
//             const response = await axios.get(`http://localhost:8086/api/v1/post/allposts`);
//             const posts = response.data;

//             // Fetch profile data of current user
//             const profileResponse = await axios.get(`http://localhost:8086/api/v1/users/${currentUser.userid}`);
//             const currentUserProfile = profileResponse.data;

//             // Set profile data
//             setProfileData(currentUserProfile);

//             // Fetch likes for each post
//             const postsWithLikes = await Promise.all(posts.map(async (post) => {
//                 const likeResponse = await axios.get(`http://localhost:8086/api/v1/post/likes/${post.postId}`);
//                 const likesCount = likeResponse.data.length;
//                 // Check if the current user has liked this post
//                 const isLiked = likeResponse.data.some(like => like.userId === userId);
//                 return { ...post, likesCount, isLiked };
//             }));

//             // Set all posts with likes
//             setAllPosts(postsWithLikes);
//         } catch (error) {
//             console.error('Error fetching profile data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchPosts();
//     }, []);

//     const handlePostSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Send the post data to the backend
//             await axios.post(`http://localhost:8086/api/v1/post/${userId}`, {
//                 content: postText
//             });

//             // Reset the post text after submission
//             setPostText('');

//             // Refresh the posts
//             fetchPosts();
//         } catch (error) {
//             console.error('Error posting:', error);
//         }
//     };

//     // Function to toggle the visibility of the comment modal
//     const toggleCommentModal = (postId) => {
//         setShowCommentModal(showCommentModal === postId ? null : postId); // Toggle the postId
//     };

//     // Function to handle like toggle
//   // Function to handle like toggle
// const handleLikeToggle = async (postId) => {
//     try {
//         if (likedPosts.includes(postId)) {
//             // Remove like
//             await axios.delete(`http://localhost:8086/api/v1/post/${postId}/likes/remove/${userId}`);
//             setLikedPosts(likedPosts.filter(id => id !== postId));
//         } else {
//             // Add like
//             await axios.post(`http://localhost:8086/api/v1/post/${postId}/likes/add/${userId}`);
//             setLikedPosts([...likedPosts, postId]);
            
//             // Fetch the post details to get the owner user ID
//             const postDetailsResponse = await axios.get(`http://localhost:8086/api/v1/post/${postId}`);
//             const postOwnerUserId = postDetailsResponse.data.userId;

//             // Add a new notification only if the post is not already liked by the current user
//             if (!likedPosts.includes(postId)) {
//                 const notificationData = 
//                      `User ${currentUser.username} liked your post.`;
                  
//                 await axios.post(`http://localhost:8086/api/v1/users/${postOwnerUserId}/notifications`, notificationData);
//             }
//         }
//         // Refresh posts after like toggle
//         fetchPosts();
//     } catch (error) {
//         console.error('Error toggling like:', error);
//     }
// };


//     return (
//         <div>
//             <div className='proper-container' >
//             <div className="container mt-4 mb-5" style={{backgroundColor:'#eff3f5'}} >
//                 <div className="d-flex justify-content-center row">
//                     {/* <div className="col-md-8">
//                         <div className="feed p-2"> */}
//                             {/* container for the post starts here */}
//                             {/* <div className="postContainer"> */}
//                                 {/* <div className="post-card"> */}
//                                     <h6 className="para">
//                                         <a href="/profile">
//                                             <img src={profileData.profile_picture} alt="Profile" className="profile-image" style={{width:'50px', height:'50px' ,borderRadius:'50%'}}/>
//                                         </a> &nbsp;&nbsp;
//                                         <BsChatLeftQuote/>  What's on your mind  <BsChatLeftQuote/>
//                                     </h6>
//                                     <form onSubmit={handlePostSubmit}>
//                                         <div className="card-text-post">
//                                             <div className="form-group" >
//                                                 <textarea
//                                                     className='textarea form-control'
                                                   
//                                                     id="postText"
//                                                     rows="3"
//                                                     style={{ width: '100%',borderColor:"black" }}
//                                                     value={postText}
//                                                     onChange={(e) => setPostText(e.target.value)}
//                                                 ></textarea>
//                                             </div>
//                                         </div>
//                                         <div className="d-flex justify-content-end">
//                                             <div className="form-group">
//                                                 <br/>
//                                                 <Button variant="outline-dark" type="submit" style={{ marginBottom: '20px' }}>
//                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-app-indicator" viewBox="0 0 16 16"  >
//                                                         <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z" />
//                                                         <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
//                                                     </svg>
//                                                 </Button>
//                                                 &nbsp;&nbsp;&nbsp;&nbsp;
//                                                 <input className="btn btn-outline-primary" type="submit" value="Post" style={{ marginBottom: '20px' }} />&nbsp;&nbsp;&nbsp;
//                                                  <input className="btn btn-outline-dark" type="reset" value="Edit" style={{ marginBottom: '20px' }} />
                                                
                                                
//                                             </div>
//                                         </div>
//                                     </form>
//                                 {/* </div> */}
//                             {/* </div> */}
//                         {/* </div>
//                     </div> */}
//                 </div>
//             </div>

//             <div className="container mt-4 mb-5" style={{backgroundColor:'#eff3f5'}} >
//                 <div className="d-flex justify-content-center row">
//                     {/* <div className="col-md-8" > */}
//                         <div className="feed p-2">
//                             {/* Loop through allPosts and render each post */}
//                             {allPosts.map(post => (
//                                 <div key={post.postId} className="bg-#eff3f5 border mb-2" style={{borderColor:'black',borderWidth:'20px',borderRadius:'20px'}}>
//                                     {/* Render user info */}
                                   
//                                     <h6><img src={post.profile_picture} alt="Profile" className="profile-image"  style={{paddingLeft:'4px',width:'50px', height:'50px' ,borderRadius:'50%'}}/>&nbsp;&nbsp;
//                                    {post.username}</h6>
//                                     {/* Your existing code for rendering each post */}
//                                     <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
//                                         <div className="d-flex flex-row align-items-center feed-text px-2">
//                                             <div className="d-flex flex-column flex-wrap ml-2">
//                                                 {post.timestamp && (
//                                                     <span className="text-black-50 time">{new Date(post.timestamp).toLocaleString()}</span>
//                                                 )}
//                                             </div>
//                                         </div>
//                                         <div className="feed-icon px-2">
//                                             <i className="fa fa-ellipsis-v text-black-50"></i>
//                                         </div>
//                                     </div>
//                                     {post.post_picture && (
//                                         <div className="feed-image p-2 px-3">
//                                             <img className="img-fluid img-responsive" src={post.post_picture} alt="Post" />
//                                         </div>
//                                     )}
//                                     <div className="p-2 px-3">
//                                         <span>{post.content}</span>
//                                     </div>
//                                     <div className="d-flex justify-content-between socials p-2 py-3">
//                                         <div className="d-flex align-items-center">
//                                             <FaThumbsUp
//                                                 className={likedPosts.includes(post.postId) ? "me-1 text-primary" : "me-1"}
//                                                 onClick={() => handleLikeToggle(post.postId)}
//                                             />
//                                             <span>{post.likesCount} Likes</span>
//                                         </div>
//                                         <div className="d-flex align-items-center">
//                                             <FaComment className="me-1" onClick={() => toggleCommentModal(post.postId)} />
//                                             <span>Comment</span>
//                                         </div>
//                                     </div>
//                                     {/* Show CommentModal only when postId matches */}
//                                     {showCommentModal === post.postId && <CommentModal postId={post.postId} />}
//                                 </div>
//                             ))}
//                         </div>
//                     {/* </div> */}
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// }

// export default PostProper;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { BsChatLeftQuote } from "react-icons/bs";
import { FaComment, FaThumbsUp } from 'react-icons/fa';
import CommentModal from '../Components/Comment/CommentModal';

const PostProper = (props) => {
    const [allPosts, setAllPosts] = useState([]);
    const [postText, setPostText] = useState('');
    const [newNotification, setnewNotifications]=useState('');
    const [profileData, setProfileData] = useState({});
    const [showCommentModal, setShowCommentModal] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('User'));
    const userId = currentUser.userid;

    useEffect(() => {
        fetchPosts();
        const fetchLikedPosts = async () => {
            
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}/likes`);
                const likedPostsData = response.data.map(like => like.postId);
                setLikedPosts(likedPostsData);
            } catch (error) {
                console.error('Error fetching liked posts:', error);
            }
        };
        fetchLikedPosts();
    }, []);

    useEffect(() => {
        fetchPosts();
        const fetchLikedPosts = async () => {
            
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/users/posts/${userId}`);
                const likedPostsData = response.data.map(like => like.postId);
                setLikedPosts(likedPostsData);
            } catch (error) {
                console.error('Error fetching liked posts:', error);
            }
        };
        fetchLikedPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/post/allposts');
            const posts = response.data;
            const profileResponse = await axios.get(`http://localhost:8080/api/v1/users/${currentUser.userid}`);
            const currentUserProfile = profileResponse.data;
            setProfileData(currentUserProfile);
            const postsWithLikes = await Promise.all(posts.map(async (post) => {
                const likeResponse = await axios.get(`http://localhost:8080/api/v1/post/likes/${post.postId}`);
                const likesCount = likeResponse.data.length;
                const isLiked = likeResponse.data.some(like => like.userId === userId);
                return { ...post, likesCount, isLiked };
            }));
            setAllPosts(postsWithLikes);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/api/v1/post/${userId}`, {
                content: postText
            });
            setPostText('');
            fetchPosts();
        } catch (error) {
            console.error('Error posting:', error);
        }
    };

    const toggleCommentModal = (postId) => {
        setShowCommentModal(showCommentModal === postId ? null : postId);
    };

    const handleLikeToggle = async (postId) => {
        try {
            if (likedPosts.includes(postId)) {
                await axios.delete(`http://localhost:8080/api/v1/post/${postId}/likes/remove/${userId}`);
                setLikedPosts(likedPosts.filter(id => id !== postId));
            } else {
                await axios.post(`http://localhost:8080/api/v1/post/${postId}/likes/add/${userId}`);
                setLikedPosts([...likedPosts, postId]);
                const postDetailsResponse = await axios.get(`http://localhost:8080/api/v1/post/${postId}`);
                const postOwnerUserId = postDetailsResponse.data.userId;
                if (!likedPosts.includes(postId)) {
                    const notificationData = 
                        `User ${currentUser.username} liked your post.`;
                    await axios.post(`http://localhost:8080/api/v1/users/${postOwnerUserId}/notifications`, notificationData);
                }
            }
            fetchPosts();
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
       
            <div style={{ width: '50%', backgroundColor: '#eff3f5', borderRadius: '20px', height: '10%', marginLeft: '15%', marginRight: '5%', boxShadow: '0 10px 10px rgba(127, 99, 240, 0.3)', paddingLeft: '20px', paddingTop: '0px' }}>
                <div className="container mt-4 mb-5" style={{ backgroundColor: '#eff3f5' }}>
                    <div className="d-flex justify-content-center row">
                        <h6 style={{ paddingLeft: '25%' }}>
                            <a href="/profile">
                                <img src={profileData.profile_picture} alt="Profile" className="profile-image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            </a> &nbsp;&nbsp;
                            <BsChatLeftQuote />  What's on your mind  <BsChatLeftQuote />
                        </h6>
                        <form onSubmit={handlePostSubmit}>
                            <div className="card-text-post">
                                <div className="form-group">
                                    <textarea
                                        className='textarea form-control'
                                        id="postText"
                                        rows="3"
                                        style={{ width: '100%', borderColor: "black" }}
                                        value={postText}
                                        onChange={(e) => setPostText(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <div className="form-group">
                                    <br />
                                    <Button variant="outline-dark" type="submit" style={{ marginBottom: '20px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-app-indicator" viewBox="0 0 16 16"  >
                                            <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z" />
                                            <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        </svg>
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input className="btn btn-outline-primary" type="submit" value="Post" style={{ marginBottom: '20px' }} />&nbsp;&nbsp;&nbsp;
                                    <input className="btn btn-outline-dark" type="reset" value="Edit" style={{ marginBottom: '20px' }} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="container mt-4 mb-5" style={{ backgroundColor: '#eff3f5' }}>
                    <div className="d-flex justify-content-center row">
                        <div className="feed p-2">
                            {allPosts.map(post => (
                                <div key={post.postId} className="bg-#eff3f5 border mb-2" style={{ borderColor:'black', borderWidth:'20px', borderRadius:'20px' }}>
                                    <h6><img src={post.profile_picture} alt="Profile" className="profile-image"  style={{paddingLeft:'4px',width:'50px', height:'50px' ,borderRadius:'50%'}}/>&nbsp;&nbsp;{post.username}</h6>
                                    <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                                        <div className="d-flex flex-row align-items-center feed-text px-2">
                                            <div className="d-flex flex-column flex-wrap ml-2">
                                                <span className="text-black-50 time">{new Date(post.timestamp).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="feed-icon px-2">
                                            <i className="fa fa-ellipsis-v text-black-50"></i>
                                        </div>
                                    </div>
                                    {post.post_picture && (
                                        <div className="feed-image p-2 px-3">
                                            <img className="img-fluid img-responsive" src={post.post_picture} alt="Post" />
                                        </div>
                                    )}
                                    <div className="p-2 px-3">
                                        <span>{post.content}</span>
                                    </div>
                                    <div className="d-flex justify-content-between socials p-2 py-3">
                                        <div className="d-flex align-items-center">
                                            <FaThumbsUp className={likedPosts.includes(post.postId) ? "me-1 text-primary" : "me-1"} onClick={() => handleLikeToggle(post.postId)} />
                                            <span>{post.likesCount} Likes</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <FaComment className="me-1" onClick={() => toggleCommentModal(post.postId)} />
                                            <span>Comment</span>
                                        </div>
                                    </div>
                                    {showCommentModal === post.postId && <CommentModal postId={post.postId} />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
       
    );
}

export default PostProper;
