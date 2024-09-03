

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillHouseDoorFill, BsGearFill, BsPersonFill, BsPlusCircle, BsSearch, BsVimeo, BsSnapchat, BsSendFill } from "react-icons/bs";
import Mode from '../Mode/Mode';
import './NavBar.css';
import SearchBar from '../SearchBar/SearchBar';
function NavScrollExample() {
  return (
    <div className='navbar-container'>
    <Navbar expand="lg" className="custom-navbar" style={{height:"49px"}}> 
      <Container fluid>
        <Navbar.Brand href="#"><BsVimeo className="vimeo-icon" style={{ color: '#135D66' }} size={'45px'} />&nbsp;
          <span style={{ fontFamily: 'Apple Chancery, cursive' }}>Viblee</span></Navbar.Brand>
      
          
          <SearchBar/>
          <Nav.Link eventKey={2} href="#">
          <button type="button" className="btn btn-outline-primary btn-sm logout-button">
            LogOut
          </button>
        </Nav.Link>
       
         
        
      </Container>
    </Navbar>
    </div>
    
  
  );
}

export default NavScrollExample;
