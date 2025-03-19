import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import NavbarWithBack from '../components/NavbarWithBack'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#FFD700'; 
    return () => {
      document.body.style.backgroundColor = ''; 
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.login({ username, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
      } else {
        setError('Invalid login credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
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
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.8)' 
          }}
        >
          <h2 className="mb-4">Login</h2>

          {error && (
            <Alert
              variant="danger"
              className="text-center"
              style={{
                backgroundColor: '#000',
                color: '#FFD700',
                border: 'none'
              }}
            >
              {error}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
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
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Login
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default LoginForm;
