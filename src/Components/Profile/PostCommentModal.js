import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { BsFillSendFill } from 'react-icons/bs';
import logo from './ImagePost1.jpg';
 
const PostCommentModal = () => {
  const [modalShow, setModalShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
 
  const handleAddComment = (emoji) => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
      setComments(comments + emoji);
    }
  };
 
  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setIsLiked(!isLiked); // Toggle the isLiked state
  };
 
  const handleShare = () => {
    // Add your share functionality here
  };
 
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        View Post
      </Button>
 
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        size="lg"
      >
     {/* <Modal.Header className="px-3 d-flex align-items-center">
  Profile picture 
//   <img
//     src="https://example.com/profile-picture.jpg"
//     alt="Profile"
//     className="rounded-circle me-3"
//     width="32"
//     height="32"
//     style={{ objectFit: 'cover' }} // Ensure the image fits within the circle
//   />
 
  {/* Username */}
{/* <h5 className="mb-0" style={{ fontSize: '1rem' }}>shruti</h5>
  </Modal.Header>*/}
 
    
    
        <Modal.Body>
          <Container fluid className="px-0">
            <Row className="m-0">
              {/* Post image and content */}
              <Col md={8} className="p-0">
                {/* Post image */}
                <img
                  src={logo}
                  className="img-fluid rounded w-100"
                  alt="Post"
                />
                {/* Caption */}
                <p className="mt-2 text-muted">Caption text goes here</p>
                {/* Like and Share buttons */}
                <div className="d-flex justify-content-between align-items-center">
                  {/* Like button */}
                  <Button
                    variant={isLiked ? 'black' : 'secondary'}
                    onClick={handleLike}
                    className="border-0 custom-button"
                    style={{ outline: 'none' }}
                  >
                    <ThumbUpAltIcon />
                  </Button>
                  {/* Share button */}
                  <Button
                    variant="black"
                    onClick={handleShare}
                    className="border-0 custom-button"
                  >
                    <BsFillSendFill />
                  </Button>
                </div>
              </Col>
              {/* Comments section */}
              <Col md={4} className="p-3" >
              <div className="px-0 d-flex align-items-center mb-2 " >
              <img
              src={logo}
              alt="Profile"
              className="rounded-circle me-3"
              width="32"
              height="32"
              style={{ objectFit: 'cover' }} // Ensure the image fits within the circle
            />
            <h5 className="mb-0" style={{ fontSize: '1rem' }}>shruti</h5>
              </div>
                <div className="d-flex flex-column h-100">
                  <strong>Comments:</strong>
                  {/* Display comments */}
                  {comments.length > 0 ? (
                    <ul className="list-unstyled mb-3">
                      {comments.map((comment, index) => (
                        <li key={index} className="mb-1">
                          <small>{comment}</small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No comments yet.</p>
                  )}
                  {/* Comment input and Add Comment button */}
                  <div className="mt-auto mb-3  d-flex align-items-center" style={{border:"1px solid grey", borderRadius:"5px"}}>
                  
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Add a comment"
                      value={newComment}
                      style={{border:"none", }}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                      variant=""
                      onClick={handleAddComment}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
 
export default PostCommentModal;
