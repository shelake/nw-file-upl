import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button, Container } from 'react-bootstrap';
import { RiDeleteBinLine } from 'react-icons/ri';

function GroupPage() {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('User'));

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/${currentUser.userid}/groups`);
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleCreateNewGroup = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewGroupName('');
  };

  const handleAddGroup = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/groups/${newGroupName}/${currentUser.userid}`);
      fetchGroups();
      setShowModal(false);
      setNewGroupName('');
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  const handleRemoveGroup = async (groupId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/groups/delete/${groupId}`);
      fetchGroups();
    } catch (error) {
      console.error('Error removing group:', error);
    }
  };

  return (
    <Container style={{paddingLeft:'20%'}}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {groups.map((group, index) => (
            <Card key={index} style={{ margin: '10px', width: '18rem', backgroundColor: index % 2 === 0 ? '#5585b5' : '#53a8b6' }}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ backgroundColor: index % 2 === 0 ? '#5585b5' : '#53a8b6' }}>Group Name: {group.groupname}</ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: index % 2 === 0 ? '#5585b5' : '#53a8b6' }}>Admin: {currentUser.username}</ListGroup.Item>
              </ListGroup>
              <RiDeleteBinLine
                style={{ cursor: 'pointer', color: 'black', position: 'absolute', top: '5px', right: '5px', fontSize: '20px' }}
                onClick={() => handleRemoveGroup(group.groupid)}
              />
            </Card>
          ))}
        </div>
        <Card style={{ margin: '10px', width: '18rem', backgroundColor: '#5585b5' }}>
          <Card.Body>
            <Button onClick={handleCreateNewGroup} style={{ width: '100%', backgroundColor: '#53a8b6', color: 'black' }} variant="primary">Create New Group</Button>
          </Card.Body>
        </Card>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Group Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Enter group name" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddGroup}>
            Add Group
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default GroupPage;
