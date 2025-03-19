import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar = () => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/login');
  };

  return (
    <Navbar style={{ backgroundColor: '#000' }}> 
      <Container>
        <Navbar.Brand 
          className="text-warning fw-bold" 
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Event Management System
        </Navbar.Brand>

        <div className="ms-auto d-flex gap-2">

        <Button
            style={{
              backgroundColor: '#FFD700', 
              color: '#000',             
              border: '2px solid #000',
              fontWeight: 'bold'
            }}
            onClick={() => navigate('/dashboard')}
          >
            Back
          </Button>

          <Button
            style={{
              backgroundColor: '#FFD700', 
              color: '#000',             
              border: '2px solid #000',
              fontWeight: 'bold'
            }}
            onClick={() => navigate('/notificationcard')}
          >
            Notifications
          </Button>

          <Button
            style={{
              backgroundColor: '#FFD700', 
              color: '#000',             
              border: '2px solid #000',
              fontWeight: 'bold'
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
