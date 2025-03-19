import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarWithBack = () => {
  const navigate = useNavigate();

  return (
    <Navbar style={{ backgroundColor: '#000' }}> 
      <Container>
        <Button 
                    style={{
                      backgroundColor: '#000', 
                      color: '#FFD700',        
                      border: '2px solid #FFD700',
                      fontWeight: 'bold'
                    }} 
                    className="me-2" 
                    onClick={() => navigate('/')}
                  >
                    Back
                  </Button>

        <Navbar.Brand 
          className="text-warning fw-bold"
          style={{ cursor: 'pointer' }}
        >
          Event Management System
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarWithBack;
