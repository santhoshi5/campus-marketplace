import apiClient from './axiosInstance';

const STORAGE_KEY = 'campus_marketplace_user';

export const authService = {
  // POST /api/auth/register
  register: async ({ fullName, email, password }) => {
    const response = await apiClient.post('/api/auth/register', {
      fullName,
      email,
      password,
    });
    return response.data;
  },

  // POST /api/auth/login
  login: async ({ email, password }) => {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // Local storage management
  getStoredUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Failed to parse stored user:', err);
      return null;
    }
  },

  setStoredUser: (user) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (err) {
      console.error('Failed to store user session:', err);
    }
  },

  clearStoredUser: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear stored user:', err);
    }
  },
};

export default authService;
