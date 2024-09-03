import React, {useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./editProfileModal.css";
import axios from 'axios';


function MyVerticallyCenteredModal(props) {
    const [forceUpdate, setForceUpdate] = useState(false);
    

    const handleForceUpdate = () => {
        setForceUpdate(prevState => !prevState); // Toggle forceUpdate state to trigger re-render
    };

    const handleUploadClick = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("profile_picture", file);

        try {
            await axios.post(
                `http://localhost:8086/api/v1/users/uploadimage/${props.userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            console.log("Image uploaded successfully");
            handleForceUpdate(); // Trigger re-render
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
  
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change Profile Photo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 style={{ color: "#376BF9" }}>Upload Photo</h4>
                <input
                    accept="image/*"
                    type="file"
                    onChange={handleUploadClick}
                />
                <p style={{ color: 'red' }}>Remove Current Photo</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );

}
const EditProfile = ({userId}) => {// Receive userId as a prop
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="outline-primary" onClick={() => setModalShow(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-app-indicator" viewBox="0 0 16 16">
                    <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z" />
                    <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                </svg>
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                userId={userId} // Pass user profile ID here
            />
        </>
    );
}

export default EditProfile;


