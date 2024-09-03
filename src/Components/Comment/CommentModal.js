import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentModal = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('User'));

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8086/api/v1/post/comments/${postId}`);
      const commentsData = response.data;

      // Fetch user profile for each comment
      const commentsWithProfilePictures = await Promise.all(commentsData.map(async (comment) => {
        const userResponse = await axios.get(`http://localhost:8086/api/v1/users/${comment.userid}`);
        const userProfile = userResponse.data;
        return { ...comment, userProfile };
      }));

      // Sort comments based on timestamp in descending order
      commentsWithProfilePictures.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setComments(commentsWithProfilePictures);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitNewComment = async () => {
    try {
      // Send a POST request to add the new comment
      await axios.post(`http://localhost:8086/api/v1/comments/users/${currentUser.userid}/posts/${postId}`, {
        comment_text: newComment
      });
  
      // Fetch the post details to get the owner user ID
      const postDetailsResponse = await axios.get(`http://localhost:8086/api/v1/post/${postId}`);
      const postOwnerUserId = postDetailsResponse.data.userId;
  
      // Add a new notification when a comment is posted
      const notificationData =`User ${currentUser.username} commented on your post.`;
     
      await axios.post(`http://localhost:8086/api/v1/users/${postOwnerUserId}/notifications`, notificationData);
  
      // Refresh comments after adding a new comment
      fetchComments();
  
      // Reset new comment text box
      setNewComment('');
    } catch (error) {
      console.error('Error posting new comment:', error);
    }
  };

  return (
    <div>
      <section>
        <div className="container py-1 text-dark">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-9">
              {/* New comment input box */}
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Write a new comment..."
                  value={newComment}
                  onChange={handleNewCommentChange}
                ></textarea>
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleSubmitNewComment}
                >
                  Add Comment
                </button>
              </div>

              {/* Existing comments */}
              {comments.map((comment, index) => (
                <div key={index} className="comments-div">
                  <div className="card w-100">
                    <div className="card-body p-1">
                      <div className="">
                        <span className="text-black-50 time">{new Date(comment.timestamp).toLocaleString()}</span>
                        <p>
                          {comment.userProfile && comment.userProfile.profile_picture && (
                            <img
                              src={comment.userProfile.profile_picture}
                              alt="Profile"
                              className="rounded-circle shadow-1-strong me-3"
                              width="25"
                              height="25"
                            />
                          )}
                          <small className="text-black-50 time"><b>{comment.comment_text}</b></small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CommentModal;
