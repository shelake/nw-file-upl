// import React, { useEffect, useState } from 'react';
// import "./CreatePost.css";
// import profile10 from './profile10.jpg';
// import { BsChatLeftQuote } from "react-icons/bs";
// import { BsCameraFill } from "react-icons/bs";
// import Button from 'react-bootstrap/Button';
// import axios from 'axios';
// import Modal from 'react-bootstrap/Modal';

// function CreateCard() {
//     const [allPosts, setAllPosts] = useState([]);
//     const [postText, setPostText] = useState('');
//     const [newNotification, setnewNotifications]=useState('');
//     const [profileData, setProfileData] = useState({});
//     const [showCommentModal, setShowCommentModal] = useState(null);
//     const [likedPosts, setLikedPosts] = useState([]);
//     const currentUser = JSON.parse(localStorage.getItem('User'));
//     const userId = currentUser.userid;
//     const [showImageUploadModal, setShowImageUploadModal] = useState(false);
//     const [postIdForImageUpload, setPostIdForImageUpload] = useState(null);
//     const [imageFile, setImageFile] = useState(null);

//     useEffect(() => {
//         fetchPosts();
//         fetchLikedPosts();
//     }, []);

//     const fetchPosts = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8086/api/v1/post/allposts`);
//             const posts = response.data;
//             const profileResponse = await axios.get(`http://localhost:8086/api/v1/users/${currentUser.userid}`);
//             const currentUserProfile = profileResponse.data;
//             setProfileData(currentUserProfile);
//             const postsWithLikes = await Promise.all(posts.map(async (post) => {
//                 const likeResponse = await axios.get(`http://localhost:8086/api/v1/post/likes/${post.postId}`);
//                 const likesCount = likeResponse.data.length;
//                 const isLiked = likeResponse.data.some(like => like.userId === userId);
//                 return { ...post, likesCount, isLiked };
//             }));
//             setAllPosts(postsWithLikes);
//         } catch (error) {
//             console.error('Error fetching profile data:', error);
//         }
//     };

//     const fetchLikedPosts = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8086/api/v1/users/${userId}/likes`);
//             const likedPostsData = response.data.map(like => like.postId);
//             setLikedPosts(likedPostsData);
//         } catch (error) {
//             console.error('Error fetching liked posts:', error);
//         }
//     };

//     const handlePostSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`http://localhost:8086/api/v1/post/${userId}`, {
//                 content: postText
//             });
//             const postId = response.data.postId; // Assuming the API returns the created post ID
//             setPostIdForImageUpload(postId);
//             setShowImageUploadModal(true);
//             setPostText('');
//             fetchPosts();
//         } catch (error) {
//             console.error('Error posting:', error);
//         }
//     };

//     const handleImageUpload = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('post_picture', imageFile);
//             await axios.post(`http://localhost:8086/api/v1/post/uploadimage/${postIdForImageUpload}`, formData);
//             setShowImageUploadModal(false);
//             setImageFile(null);
//             fetchPosts();
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         }
//     };

//     const handleYes = () => {
//         setShowImageUploadModal(false);
//         setImageFile(null);
//         fetchPosts();
//     };

//     const handleNo = () => {
//         setShowImageUploadModal(false);
//         setImageFile(null);
//         fetchPosts();
//     };

//     const handleImageChange = (e) => {
//         setImageFile(e.target.files[0]);
//     };

//     return (
//         <div className="container mt-4 mb-5" style={{backgroundColor:'#eff3f5'}} >
//             <div className="d-flex justify-content-center row">
//                 <h6 className="para">
//                     <a href="/profile">
//                         <img src={profileData.profile_picture} alt="Profile" className="profile-image" style={{width:'50px', height:'50px' ,borderRadius:'50%'}}/>
//                     </a> &nbsp;&nbsp;
//                     <BsChatLeftQuote/>  What's on your mind  <BsChatLeftQuote/>
//                 </h6>
//                 <form onSubmit={handlePostSubmit}>
//                     <div className="card-text-post">
//                         <div className="form-group" >
//                             <textarea
//                                 className='textarea form-control'
//                                 id="postText"
//                                 rows="3"
//                                 style={{ width: '100%',borderColor:"black" }}
//                                 value={postText}
//                                 onChange={(e) => setPostText(e.target.value)}
//                             ></textarea>
//                         </div>
//                     </div>
//                     <div className="d-flex justify-content-end">
//                         <div className="form-group">
//                             <br/>
//                             <Button variant="outline-dark" type="submit" style={{ marginBottom: '20px' }}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-app-indicator" viewBox="0 0 16 16"  >
//                                     <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z" />
//                                     <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
//                                 </svg>
//                             </Button>
//                             &nbsp;&nbsp;&nbsp;&nbsp;
//                             <input className="btn btn-outline-primary" type="submit" value="Post" style={{ marginBottom: '20px' }} />&nbsp;&nbsp;&nbsp;
//                             <input className="btn btn-outline-dark" type="reset" value="Edit" style={{ marginBottom: '20px' }} />
//                         </div>
//                     </div>
//                 </form>
//                 <Modal show={showImageUploadModal} onHide={() => setShowImageUploadModal(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Upload Image</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         Do you want to upload the post with an image?
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleNo}>No</Button>
//                         <Button variant="primary" onClick={handleYes}>Yes</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         </div>
//     );
// }

// export default CreateCard;



// import React, { useEffect, useState } from 'react';
// import "./CreatePost.css";
// import profile10 from './profile10.jpg';
// import { BsChatLeftQuote } from "react-icons/bs";
// import { BsCameraFill } from "react-icons/bs";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';

// function CreateCard() {
//     const [allPosts, setAllPosts] = useState([]);
//     const [postText, setPostText] = useState('');
//     const [newNotification, setnewNotifications] = useState('');
//     const [profileData, setProfileData] = useState({});
//     const [showCommentModal, setShowCommentModal] = useState(null);
//     const [likedPosts, setLikedPosts] = useState([]);
//     const currentUser = JSON.parse(localStorage.getItem('User'));
//     const userId = currentUser.userid;
//     const [showImageUploadModal, setShowImageUploadModal] = useState(false);
//     const [postIdForImageUpload, setPostIdForImageUpload] = useState(null);
//     const [imageFile, setImageFile] = useState(null);

//     useEffect(() => {
//         fetchPosts();
//         fetchLikedPosts();
//     }, []);

//     const fetchPosts = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8086/api/v1/post/allposts`);
//             const posts = response.data;
//             const profileResponse = await axios.get(`http://localhost:8086/api/v1/users/${currentUser.userid}`);
//             const currentUserProfile = profileResponse.data;
//             setProfileData(currentUserProfile);
//             const postsWithLikes = await Promise.all(posts.map(async (post) => {
//                 const likeResponse = await axios.get(`http://localhost:8086/api/v1/post/likes/${post.postId}`);
//                 const likesCount = likeResponse.data.length;
//                 const isLiked = likeResponse.data.some(like => like.userId === userId);
//                 return { ...post, likesCount, isLiked };
//             }));
//             setAllPosts(postsWithLikes);
//         } catch (error) {
//             console.error('Error fetching profile data:', error);
//         }
//     };

//     const fetchLikedPosts = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8086/api/v1/users/${userId}/likes`);
//             const likedPostsData = response.data.map(like => like.postId);
//             setLikedPosts(likedPostsData);
//         } catch (error) {
//             console.error('Error fetching liked posts:', error);
//         }
//     };

//     const handlePostSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`http://localhost:8086/api/v1/post/${userId}`, {
//                 content: postText
//             });
//             console.log(response)
//             const postId = response.data.postId; // Assuming the API returns the created post ID
//             setPostIdForImageUpload(postId);
//             setShowImageUploadModal(true);
//             setPostText('');
//             fetchPosts();
//         } catch (error) {
//             console.error('Error posting:', error);
//         }
//     };

//     const handleImageUpload = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('post_picture', imageFile);
//             await axios.post(`http://localhost:8086/api/v1/post/uploadimage/${postIdForImageUpload}`, formData);
//             setShowImageUploadModal(false);
//             setImageFile(null);
//             fetchPosts();
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         }
//     };

//     const handleYes = () => {
//         setShowImageUploadModal(true);
//     };

//     const handleNo = () => {
//         setShowImageUploadModal(false);
//         setImageFile(null);
//         fetchPosts();
//     };

//     const handleImageChange = (e) => {
//         setImageFile(e.target.files[0]);
//     };

//     return (
//         <div className="container mt-4 mb-5" style={{ backgroundColor: '#eff3f5' }} >
//             <div className="d-flex justify-content-center row">
//                 <h6 className="para">
//                     <a href="/profile">
//                         <img src={profileData.profile_picture} alt="Profile" className="profile-image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
//                     </a> &nbsp;&nbsp;
//                     <BsChatLeftQuote /> What's on your mind <BsChatLeftQuote />
//                 </h6>
//                 <form onSubmit={handlePostSubmit}>
//                     <div className="card-text-post">
//                         <div className="form-group" >
//                             <textarea
//                                 className='textarea form-control'
//                                 id="postText"
//                                 rows="3"
//                                 style={{ width: '100%', borderColor: "black" }}
//                                 value={postText}
//                                 onChange={(e) => setPostText(e.target.value)}
//                             ></textarea>
//                         </div>
//                     </div>
//                     <div className="d-flex justify-content-end">
//                         <div className="form-group">
//                             <br />
//                             <Button variant="outline-dark" type="submit" style={{ marginBottom: '20px' }}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-app-indicator" viewBox="0 0 16 16"  >
//                                     <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z" />
//                                     <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
//                                 </svg>
//                             </Button>
//                             &nbsp;&nbsp;&nbsp;&nbsp;
//                             <input className="btn btn-outline-primary" type="submit" value="Post" style={{ marginBottom: '20px' }} />&nbsp;&nbsp;&nbsp;
//                             <input className="btn btn-outline-dark" type="reset" value="Edit" style={{ marginBottom: '20px' }} />
//                         </div>
//                     </div>
//                 </form>
//                 <Modal show={showImageUploadModal} onHide={() => setShowImageUploadModal(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Upload Image</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         Do you want to upload the post with an image?
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleNo}>No</Button>
//                         <Button variant="primary" onClick={handleYes}>Yes</Button>
//                     </Modal.Footer>
//                 </Modal>
//                 <Modal show={showImageUploadModal} onHide={() => setShowImageUploadModal(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Upload Image</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <input type="file" accept="image/*" onChange={handleImageChange} />
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowImageUploadModal(false)}>Cancel</Button>
//                         <Button variant="primary" onClick={handleImageUpload}>Upload</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         </div>
//     );
// }

// export default CreateCard;


import React, { useEffect, useState } from 'react';
import "./CreatePost.css";
import profile10 from './profile10.jpg';
import { BsChatLeftQuote } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function CreateCard() {
    const [allPosts, setAllPosts] = useState([]);
    const [postText, setPostText] = useState('');
    const [profileData, setProfileData] = useState({});
    const [showImageUploadModal, setShowImageUploadModal] = useState(false);
    const [postIdForImageUpload, setPostIdForImageUpload] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem('User'));
    const userId = currentUser.userid;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/post/allposts`);
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
            console.error('Error fetching posts or profile data:', error);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/post/${userId}`, {
                content: postText
            });
            const postId = response.data.postId; // Assuming the API returns the created post ID
            setPostIdForImageUpload(postId);
            setShowImageUploadModal(true);
            setPostText('');
            fetchPosts();
        } catch (error) {
            console.error('Error posting:', error);
        }
    };

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('post_picture', imageFile);
            await axios.post(`http://localhost:8080/api/v1/post/uploadimage/${postIdForImageUpload}`, formData);
          // await axios.post(`http://localhost:8080/api/v1/post/uploadimage/${postIdForImageUpload}`, formData);
            setShowImageUploadModal(false);
            setImageFile(null);
            fetchPosts();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <div className="container mt-4 mb-5" style={{ backgroundColor: '#eff3f5' }}>
            <div className="d-flex justify-content-center row">
                <h6 className="para">
                    <a href="/profile">
                        <img src={profileData.profile_picture} alt="Profile" className="profile-image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    </a> &nbsp;&nbsp;
                    <BsChatLeftQuote /> What's on your mind <BsChatLeftQuote />
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-app-indicator" viewBox="0 0 16 16">
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
                <Modal show={showImageUploadModal} onHide={() => setShowImageUploadModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowImageUploadModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleImageUpload}>Upload</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default CreateCard;

