import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import image1 from './ImagePost1.jpg';



function MyVerticallyCenteredModal(props) {
    const [userFriends, setUserFriends] = useState([]);
    const [show, setShow] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('User'));

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/users/${currentUser.userid}/friends`)
            .then(response => {
                setUserFriends(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            scrollable
            style={{ height: "500px" }}
            {...props}
            size="sm-lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="container"><h4 style={{ fontFamily: "initial" }}>Friends</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    {userFriends.map((friendship) => (
                     
                        <div key={friendship.friendshipid} className="col-md-6">
                           {console.log(friendship)}
                            <div className="card">
                                <div className="container">
                                    <div className="mt-5 flex justify-content-center">
                                        <div className="card p-3">
                                            <div className="d-flex align-items-center">
                                                <div className="image">
                                                    <img src={friendship.user1Profile || image1} width="145" height="145" style={{ borderRadius: "50%" }} alt="Profile" />
                                                </div>
                                                <div className="ml-3 w-100">
                                                    <h4 className="mb-0 mt-0" style={{ fontFamily: "initial" }}>{friendship.user2name}</h4>
                                                    <div className="button mt-2 d-flex flex-row align-items-center">
                                                        <button className="btn btn-sm btn-outline-dark w-100">Remove</button>
                                                        <button className="btn btn-sm btn-primary w-100 ml-2">Message</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    );
}



const ListOfFriends = () => {
    const [modalShow, setModalShow] = useState(false);
    const [userFriends, setUserFriends] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('User'));

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/users/${currentUser.userid}/friends`) // Assuming user ID is 13
            .then(response => {
                setUserFriends(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <>
            <Button variant="outline-primary" onClick={() => setModalShow(true)}>
               {userFriends.length} 
            </Button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default ListOfFriends;
