import axios from 'axios';

// Backend runs at http://localhost:8081
// You can also override this via .env with VITE_API_BASE_URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for unified error message handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'An unexpected error occurred. Please try again.';
    
    if (error.response) {
      // Backend returned an error response (4xx, 5xx)
      const data = error.response.data;
      if (typeof data === 'string') {
        message = data;
      } else if (data?.message) {
        message = data.message;
      } else if (data?.error) {
        message = data.error;
      } else {
        message = `Server returned error (${error.response.status})`;
      }
    } else if (error.request) {
      // Backend not reached
      message = 'Cannot connect to backend server at ' + BASE_URL + '. Please ensure your Spring Boot application is running on port 8081.';
    } else if (error.message) {
      message = error.message;
    }

    const enhancedError = new Error(message);
    enhancedError.originalError = error;
    enhancedError.status = error.response?.status;
    return Promise.reject(enhancedError);
  }
);

export default apiClient;
