import axios from 'axios';
import config from '../config/env';
import toast from 'react-hot-toast';
import { isTokenExpired, getTimeUntilExpiry, setupTokenExpiryWarning } from '../helpers/tokenManager';

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json'
  }
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Silent token refresh (30 mins before expiry)
const setupSilentRefresh = () => {
  const token = localStorage.getItem(`${config.storage.prefix}${config.storage.tokenKey}`);
  if (!token || isTokenExpired(token)) return;

  const timeUntilExpiry = getTimeUntilExpiry(token);
  const thirtyMinutes = 30 * 60 * 1000;

  if (timeUntilExpiry > thirtyMinutes) {
    setTimeout(async () => {
      try {
        const { data } = await apiClient.post('/student/refresh-token');
        localStorage.setItem(`${config.storage.prefix}${config.storage.tokenKey}`, data.data.token);
        setupSilentRefresh(); // Setup next refresh
        setupTokenExpiryWarning(); // Setup new warning
      } catch (error) {
        console.error('Silent refresh failed:', error);
      }
    }, timeUntilExpiry - thirtyMinutes);
  }
};

// Request interceptor
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

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${config.apiBaseUrl}/student/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(`${config.storage.prefix}${config.storage.tokenKey}`)}`
            }
          }
        );
        
        const newToken = data.data.token;
        localStorage.setItem(`${config.storage.prefix}${config.storage.tokenKey}`, newToken);
        isRefreshing = false;
        onRefreshed(newToken);
        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        toast.error('Session expired. Please login again.');
        localStorage.clear();
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Initialize on load
setupSilentRefresh();
setupTokenExpiryWarning();

export default apiClient;
