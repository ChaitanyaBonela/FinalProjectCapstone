import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import { Container, Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import AddNotifiNavbar from '../components/AddNotifiNavbar';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newNotification, setNewNotification] = useState({
    userId: '',
    eventID: '',
    message: '',
  });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userRole = token
    ? jwtDecode(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    : null;

  // Fetch Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await ApiService.getNotifications();
      if (response.success) {
        setNotifications(response.data);
      } else {
        setMessage({ type: 'danger', text: 'Failed to fetch notifications.' });
        setShowAlertModal(true);
      }
    };
    fetchNotifications();
  }, []);

  const handleAddNotification = async (e) => {
    e.preventDefault();

    const formattedNotification = {
      notificationID: 0,
      userId: Number(newNotification.userId),
      eventID: Number(newNotification.eventID),
      message: newNotification.message,
      sentAt: new Date().toISOString(),
    };

    const response = await ApiService.createNotification(formattedNotification);

    if (response.success) {
      setMessage({ type: 'success', text: 'Notification added successfully!' });

      const updatedNotifications = await ApiService.getNotifications();
      if (updatedNotifications.success) {
        
        setNotifications([formattedNotification, ...updatedNotifications.data]);
      }

      setShowModal(false);
      setNewNotification({ userId: '', eventID: '', message: '' });
    } else {
      setMessage({ type: 'danger', text: 'Failed to add notification.' });
    }

    setShowAlertModal(true);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); 
  };

  return (
    <>
    <AddNotifiNavbar showLogout={true} onLogout={handleLogout} />

    <div style={{ backgroundColor: '#FFD700', minHeight: '100vh', padding: '20px' }}>
      <Container>
        <h1 className="text-center my-4 text-black">Notifications</h1>

        
        {userRole === 'Admin' && (
          <Button
            variant="dark"
            className="mb-3"
            onClick={() => setShowModal(true)}
          >
            +Add Notification
          </Button>
        )}

        
        <Modal
          show={showAlertModal}
          onHide={() => setShowAlertModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                color: message.type === 'success' ? '#155724' : '#721c24'
              }}
            >
              {message.type === 'success' ? ' Success' : ' Error'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            className="text-center"
            style={{
              backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
              color: message.type === 'success' ? '#155724' : '#721c24',
              border: `3px solid ${
                message.type === 'success' ? '#c3e6cb' : '#f5c6cb'
              }`,
              padding: '20px',
            }}
          >
            <strong>{message.text}</strong>
          </Modal.Body>
        </Modal>

        
        <Row>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Col key={notification.notificationID} md={6} className="mb-3">
                <Card
                  className="p-3 shadow-sm"
                  style={{
                    backgroundColor: '#FFD700',
                    color: '#000',
                    border: '3px solid #000'
                  }}
                >
                  <h4>{notification.message}</h4>
                  <p>
                    <strong>Sent At:</strong>{' '}
                    {new Date(notification.sentAt).toLocaleString()}
                  </p>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No notifications available.</p>
          )}
        </Row>

        
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddNotification}>
              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="number"
                  value={newNotification.userId}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, userId: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event ID</Form.Label>
                <Form.Control
                  type="number"
                  value={newNotification.eventID}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, eventID: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newNotification.message}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, message: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Button
                style={{
                  backgroundColor: '#000',
                  color: '#FFD700',
                  border: '2px solid #FFD700'
                }}
                type="submit"
                className="w-100"
              >
                Add Notification
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
    </>
  );
};

export default NotificationsPage;
