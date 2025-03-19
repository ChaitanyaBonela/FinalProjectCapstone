import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AppNavbar from '../components/Navbar';

const WelcomePage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#FFD700'; 
    return () => {
      document.body.style.backgroundColor = ''; 
    };
  }, []);

  return (
    <>
      <AppNavbar />
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
       
          <h2>Welcome to the Event Management System!</h2>
          
      </Container>
    </>
  );
};

export default WelcomePage;
