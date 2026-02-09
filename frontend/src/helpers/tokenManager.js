import toast from 'react-hot-toast';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'coaching_app_secure_key_2024';

// Decode JWT without verification
export const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token) => {
  const payload = decodeToken(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
};

// Get time until token expires (in ms)
export const getTimeUntilExpiry = (token) => {
  const payload = decodeToken(token);
  if (!payload?.exp) return 0;
  return (payload.exp * 1000) - Date.now();
};

// Setup token expiry warning (5 mins before)
export const setupTokenExpiryWarning = () => {
  const token = localStorage.getItem('coaching_app_auth_token');
  if (!token || isTokenExpired(token)) return;

  const timeUntilExpiry = getTimeUntilExpiry(token);
  const fiveMinutes = 5 * 60 * 1000;

  if (timeUntilExpiry > fiveMinutes) {
    setTimeout(() => {
      toast('⚠️ Session expiring in 5 minutes. Please save your work.', {
        duration: 10000,
        position: 'top-center',
      });
    }, timeUntilExpiry - fiveMinutes);
  }
};

// Encrypt credentials for "Remember Me"
export const encryptCredentials = (email, password) => {
  const data = JSON.stringify({ email, password });
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

// Decrypt credentials
export const decryptCredentials = (encrypted) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
};

// Save credentials for auto-login
export const saveRememberMe = (email, password) => {
  const encrypted = encryptCredentials(email, password);
  localStorage.setItem('coaching_app_remember', encrypted);
};

// Get saved credentials
export const getRememberMe = () => {
  const encrypted = localStorage.getItem('coaching_app_remember');
  return encrypted ? decryptCredentials(encrypted) : null;
};

// Clear remember me
export const clearRememberMe = () => {
  localStorage.removeItem('coaching_app_remember');
};
