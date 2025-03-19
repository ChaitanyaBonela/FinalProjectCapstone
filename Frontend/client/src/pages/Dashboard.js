import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import DashboardNavbar from '../components/DashboardNavbar';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
      document.body.style.backgroundColor = '#FFD700'; 
      return () => {
        document.body.style.backgroundColor = ''; 
      };
    }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);

  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); 
  };

 
  const handleGoToEvents = () => {
    navigate('/events');
  };

  return (
    <>
      
      <DashboardNavbar showLogout={true} onLogout={handleLogout} />

      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card
          className="p-4 shadow-lg text-center"
          style={{
            width: '100%',
            maxWidth: '700px',
            backgroundColor: '#FFD700', 
            color: '#000', 
            border: '3px solid #000',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(255, 215, 0, 0.8)'
          }}
        >
          <h2 className="mb-4">Hello, Welcome to the Dashboard!</h2>

          <Button
            variant="outline-dark"
            className="w-100"
            style={{
              backgroundColor: '#000',
              color: '#FFD700',
              border: 'none',
              fontWeight: 'bold',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            onClick={handleGoToEvents}
          >
            Go to Events
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;
