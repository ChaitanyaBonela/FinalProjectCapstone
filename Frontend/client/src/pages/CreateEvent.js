import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';

const CreateEvent = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
      title: '',
      description: '',
      location: '',
      date: '',
      maxAttendees: 0
    });

     const [message, setMessage] = useState({ type: '', text: '' });



const handleCreateEvent = async (e) => {
    e.preventDefault();
    const { title, description, location,date,  maxAttendees } = newEvent;

    
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
      setMessage({ type: 'danger', text: 'Failed to create event. Please try again.' });
    }
 
};
  return (
      <Container>
        <h1 className="text-center my-4">Events</h1>
  
        {/* Display Success/Failure Messages */}
        {message.text && (
          <Alert variant={message.type} className="text-center">
            {message.text}
          </Alert>
        )}
  
  
        {/* Create Event Form */}
        <Card className="mt-4 p-4 shadow-lg">
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
  
            <Button type="submit" variant="primary">
              Create Event
            </Button>
          </Form>
        </Card>
      </Container>
    );
}