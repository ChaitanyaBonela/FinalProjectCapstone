import axios from 'axios';

const API_BASE_URL = 'https://localhost:7114/api';

// Set Authorization header for authenticated requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const ApiService = {
  // Login API
  login: async ({ username, password }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/Auth/login`,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response.data;
    } catch (error) {
      console.error('Login error', error);
      return { success: false };
    }
  },

  // Signup API
  signup: async (userPayload) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Auth/register`, userPayload);
      return response.data;
    } catch (error) {
      console.error('Signup failed', error);
      return { success: false, message: error.message };
    }
  },

  // GET: Fetch All Events
  getEvents: async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Events', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching events:', error);
      return { success: false };
    }
  },

  // POST: RSVP to an Event
  createRSVP: async (eventId, userId, status) => {
    try {
      const token = localStorage.getItem('token'); 
      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};
  
      const response = await axios.post(
        `${API_BASE_URL}/RSVP`,
        {
          rsvpId: 0, 
          eventId,
          userId,
          status
        },
        { headers } 
      );
  
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creating RSVP:', error.response?.data || error.message);
      return { success: false, message: 'Failed to RSVP for event' };
    }
  },

  // POST: Create a New Event
  createEvent: async (eventData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/Events`, eventData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
        
      });
      return { success: response.status === 200, data: response.data };
      
    } catch (error) {
      console.error('Error creating event:', error.response?.data || error.message);
      return { success: false, message: 'failed event creation' };
    }
},
// GET: Fetch Notifications
getNotifications: async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Notifications`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { success: false, message: 'Failed to fetch notifications' };
  }
},

// POST: Create Notification
createNotification: async (notificationData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/Notifications`, notificationData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error creating notification:', error.response?.data || error.message);
    return { success: false, message: 'Failed to create notification' };
  }
},
// GET: Fetch Notifications by User ID
getNotificationsByUser: async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/Notifications`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching user notifications:', error.response?.data || error.message);
    return { success: false, message: 'Failed to fetch notifications' };
  }
}
};
export default ApiService;
export { setAuthToken };
