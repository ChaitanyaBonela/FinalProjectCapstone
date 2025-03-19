import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert, Form, Button, Container, Card } from 'react-bootstrap';
import NavbarWithBack from '../components/NavbarWithBack';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  
  useEffect(() => {
    document.body.style.backgroundColor = '#FFD700'; 
    return () => {
      document.body.style.backgroundColor = ''; 
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    const userPayload = {
      userID: 0,
      username: username,
      passwordHash: passwordHash,
      email: email,
      role: role,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await axios.post('https://localhost:7114/api/Auth/register', userPayload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        setAlert({ message: 'Signup successful!', type: 'success' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setAlert({ message: 'Signup failed. Please try again.', type: 'danger' });
      }
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      setAlert({
        message: `Signup failed: ${error.response?.data?.message || 'An unexpected error occurred.'}`,
        type: 'danger'
      });
    }
  };

  return (
    <>
      <NavbarWithBack />
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card
          className="p-4 shadow-lg text-center"
          style={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#FFD700', 
            color: '#000', 
            border: '3px solid #000',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(255, 215, 0, 0.8)' 
          }}
        >
          <h2 className="mb-4">Register</h2>

          {alert.message && (
            <Alert
              variant={alert.type}
              className="text-center"
              style={{
                backgroundColor: '#000',
                color: '#FFD700',
                border: 'none'
              }}
            >
              {alert.message}
            </Alert>
          )}

          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                style={{
                  backgroundColor: '#FFF',
                  color: '#000',
                  border: '1px solid #000'
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordHash}
                onChange={(e) => setPasswordHash(e.target.value)}
                required
                placeholder="Enter your password"
                style={{
                  backgroundColor: '#FFF',
                  color: '#000',
                  border: '1px solid #000'
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                style={{
                  backgroundColor: '#FFF',
                  color: '#000',
                  border: '1px solid #000'
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                placeholder="Enter role (Attendee, Admin, Organizer)"
                style={{
                  backgroundColor: '#FFF',
                  color: '#000',
                  border: '1px solid #000'
                }}
              />
            </Form.Group>

            <Button
              type="submit"
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
            >
              Sign Up
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default SignupForm;
