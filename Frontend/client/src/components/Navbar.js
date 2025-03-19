import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AppNavbar = () => {
  const navigate = useNavigate();

  return (
    <Navbar style={{ backgroundColor: '#000' }} expand="lg"> 
      <Container>
        <Navbar.Brand 
          onClick={() => navigate('/')} 
          style={{ 
            cursor: 'pointer', 
            color: '#FFD700',      
            fontWeight: 'bold' 
          }}
        >
          Event Management System
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Button 
            style={{
              backgroundColor: '#000', 
              color: '#FFD700',        
              border: '2px solid #FFD700',
              fontWeight: 'bold'
            }} 
            className="me-2" 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>

          <Button 
            style={{
              backgroundColor: '#000', 
              color: '#FFD700',       
              border: '2px solid #FFD700',
              fontWeight: 'bold'
            }}
            onClick={() => navigate('/signup')}
          >
            Signup
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
