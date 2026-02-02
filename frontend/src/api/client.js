import axios from 'axios';
import config from '../config/env';

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 90000,// Increase to 60 seconds for slow backend
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (requestConfig) => {
    const token = localStorage.getItem(`${config.storage.prefix}${config.storage.tokenKey}`);
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(`${config.storage.prefix}${config.storage.refreshTokenKey}`);
        if (refreshToken) {
          // Implement token refresh logic here
          // const { data } = await axios.post(`${config.apiBaseUrl}/auth/refresh`, { refreshToken });
          // localStorage.setItem(`${config.storage.prefix}${config.storage.tokenKey}`, data.token);
          // return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Redirect to login
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
