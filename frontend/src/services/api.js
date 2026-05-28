import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For sending cookies if needed
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const api = {
  auth: {
    login: async (credentials) => {
      // return apiClient.post('/api/auth/login', credentials);
      
      // MOCK IMPLEMENTATION for frontend testing
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (credentials.email && credentials.password) {
            resolve({ data: { token: 'mock_token_123', user: { id: 1, email: credentials.email } } });
          } else {
            reject({ response: { data: { message: 'Invalid credentials' } } });
          }
        }, 1000);
      });
    },
    register: async (userData) => {
      return apiClient.post('/api/auth/register', userData);
    },
    logout: () => {
      localStorage.removeItem('token');
      // Additional logout logic
    }
  },
  chat: {
    sendMessage: async (message, history) => {
      // return apiClient.post('/api/chat', { message, history });
      
      // MOCK IMPLEMENTATION
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { response: `Mock backend response to: ${message}` } });
        }, 1500);
      });
    },
    getHistory: async () => {
      return apiClient.get('/api/chat/history');
    }
  }
};

export default api;
