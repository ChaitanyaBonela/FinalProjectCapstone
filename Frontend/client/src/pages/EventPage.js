import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';
import { Container, Row, Col, Card, Button, Form, Modal, Alert } from 'react-bootstrap';
import DashboardNavbar from '../components/DashboardNavbar';

const EventPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    maxAttendees: 0
  });

  const [showPopup, setShowPopup] = useState(false);
  const [rsvpDetails, setRsvpDetails] = useState({
    eventId: '',
    userId: '',
    status: 'Attending',
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); 
  };
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await ApiService.getEvents();
      if (response.success) {
        setEvents(response.data);
      } else {
        console.error('Failed to fetch events');
        setMessage({ type: 'danger', text: 'Failed to fetch events. Please try again.' });
      }
    };
    fetchEvents();
  }, []);

  const handleRSVPPopup = (eventId) => {
    setRsvpDetails({ ...rsvpDetails, eventId });
    setShowPopup(true);
  };

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    const response = await ApiService.createRSVP(rsvpDetails.eventId, rsvpDetails.userId, rsvpDetails.status);

    if (response.success) {
      setMessage({ type: 'success', text: 'RSVP status updated successfully!' });
      setShowPopup(false);
    } else {
      setMessage({ type: 'danger', text: 'Failed to update RSVP status. Please try again.' });
    }

    setShowAlertPopup(true);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const { title, description, location, date, maxAttendees } = newEvent;

    const formattedEvent = {
      eventID: 0,
      title,
      description,
      location,
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      maxAttendees: Number(maxAttendees)
    };

    

    const response = await ApiService.createEvent(formattedEvent);

    if (response.success) {
      setMessage({ type: 'success', text: 'Event created successfully!' });

      setNewEvent({
        title: '',
        description: '',
        location: '',
        date: '',
        maxAttendees: 0
      });
    } else {
      setMessage({ type: 'failed', text: 'Failed to create event... UnAuthorized Access.' });
    }

    setShowAlertPopup(true);
  };

  return (
    <><DashboardNavbar showLogout={true} onLogout={handleLogout} />
    
    <div style={{ backgroundColor: '#FFD700', minHeight: '100vh', padding: '20px' }}>
      <Container>
        <h1 className="text-center my-4 text-black">Events</h1>

       
        <Modal show={showAlertPopup} onHide={() => setShowAlertPopup(false)} centered>
            <Modal.Body>
              <Alert
                variant={message.type}
                className="text-center"
                style={{
                  backgroundColor: message.type === 'success' ? '#000' : '#8B0000',
                  color: '#FFD700',
                  border: '2px solid #FFD700'
                }}
              >
                {message.text}
              </Alert>
              <Button
                style={{
                  backgroundColor: '#000',
                  color: '#FFD700',
                  border: '2px solid #FFD700'
                }}
                className="w-100"
                onClick={() => setShowAlertPopup(false)}
              >
                Close
              </Button>
            </Modal.Body>
          </Modal>

        
        <Row>
          {events.length > 0 ? (
            events.map((event) => (
              <Col key={event.eventID} md={6} className="mb-3">
                <Card
                  className="p-3 shadow-sm"
                  style={{
                    backgroundColor: '#FFD700',
                    color: '#000',
                    border: '3px solid #000'
                  }}
                >
                  <h3>{event.title}</h3>
                  <p><strong>Description:</strong> {event.description}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Max Attendees:</strong> {event.maxAttendees}</p>
                  <Button
                    style={{
                      backgroundColor: '#000',
                      color: '#FFD700',
                      border: '2px solid #FFD700'
                    }}
                    className="mt-2 w-100"
                    onClick={() => handleRSVPPopup(event.eventID)}
                  >
                    RSVP
                  </Button>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No events available.</p>
          )}
        </Row>

        
        <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>RSVP for Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleRSVPSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Event ID</Form.Label>
                <Form.Control
                  type="text"
                  value={rsvpDetails.eventId}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  value={rsvpDetails.userId}
                  onChange={(e) => setRsvpDetails({ ...rsvpDetails, userId: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={rsvpDetails.status}
                  onChange={(e) => setRsvpDetails({ ...rsvpDetails, status: e.target.value })}
                  required
                >
                  <option value="Attending">Attending</option>
                  <option value="Not Attending">Not Attending</option>
                  <option value="Pending">Pending</option>
                </Form.Select>
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
                Submit RSVP
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        
        <Card
          className="mt-4 p-4 shadow-lg"
          style={{
            backgroundColor: '#FFD700',
            color: '#000',
            border: '3px solid #000'
          }}
        >
          <h3>Create New Event</h3>
          <Form onSubmit={handleCreateEvent}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Max Attendees</Form.Label>
              <Form.Control
                type="number"
                value={newEvent.maxAttendees}
                onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: Number(e.target.value) })}
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
              Create Event
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
    </>
  );
  
};

export default EventPage;
