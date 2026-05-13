import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { entry } from "../reducers/LoginSlice";
import { Box, Container, TextField, Button, Typography, Paper, InputAdornment, IconButton, Checkbox, FormControlLabel } from "@mui/material";
import { Visibility, VisibilityOff, School, ContentCopy, Check } from "@mui/icons-material";
import instance from "../apis/apiRequest";
import { student_Login, RegisterStudent } from "../apis/apiContsants";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import MultiStepAdmission from '../Pages/Addmission/MultiStepAdmission';
import { saveRememberMe, getRememberMe, clearRememberMe, setupTokenExpiryWarning } from '../helpers/tokenManager';

const Login = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [copied, setCopied] = useState({ email: false, password: false });
  const dispatch = useDispatch();

  const DEMO = { email: 'demo@test.com', password: 'demo123' };

  const handleCopy = (field) => {
    navigator.clipboard.writeText(DEMO[field]);
    setCred(prev => ({ ...prev, [field]: DEMO[field] }));
    setCopied(prev => ({ ...prev, [field]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [field]: false })), 2000);
  };

  // Auto-fill credentials if remembered
  useEffect(() => {
    const saved = getRememberMe();
    if (saved) {
      setCred({ email: saved.email, password: saved.password });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await instance.post(student_Login, cred);
      localStorage.setItem("coaching_app_auth_token", response.data.data.token);
      
      // Save credentials if remember me is checked
      if (rememberMe) {
        saveRememberMe(cred.email, cred.password);
      } else {
        clearRememberMe();
      }
      
      // Setup token expiry warning
      setupTokenExpiryWarning();
      
      toast.success('Welcome back!');
      setTimeout(() => dispatch(entry()), 500);
    } catch (err) {
      setError("Invalid email or password");
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (formData) => {
    setLoading(true);
    try {
      console.log('Registration payload:', formData);
      const response = await instance.post(RegisterStudent, formData);
      localStorage.setItem("coaching_app_auth_token", response.data.data.token);
      toast.success('Registration successful! Welcome!');
      setTimeout(() => dispatch(entry()), 500);
    } catch (err) {
      setError("Registration failed. Please try again.");
      toast.error('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  if (isRegister) {
    return (
      <Box sx={{ 
        height: '100vh',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overflow: 'hidden',
        px: 4,
        py: 3
      }}>
        <Box sx={{ width: '100%', maxWidth: 380 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MultiStepAdmission 
              onSubmit={handleRegistration} 
              showSignInLink={true}
              onSignInClick={() => {
                setIsRegister(false);
                setError("");
              }}
            />
          </motion.div>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overflow: 'hidden'
    }}>
      <Container maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Paper elevation={4} sx={{ p: 2, borderRadius: 2, mx: 'auto', maxWidth: 340 }}>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <School sx={{ fontSize: 28, color: 'primary.main', mb: 0.25 }} />
              <Typography variant="h6" fontWeight={600} sx={{ lineHeight: 1.3 }}>
                Welcome Back
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Sign in to your account
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={cred.email}
                onChange={handleChange}
                required
                size="small"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={cred.password}
                onChange={handleChange}
                required
                size="small"
                error={!!error}
                helperText={error || ' '}
                sx={{ mb: 0, '& .MuiFormHelperText-root': { mt: 0.25, mb: 0 } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
                sx={{ mb: 0.75, mt: 0 }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ py: 0.9, fontWeight: 600, mb: 1 }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <Box sx={{
              p: 1,
              borderRadius: 1.5,
              border: '1px dashed',
              borderColor: 'primary.light',
              background: 'rgba(102,126,234,0.07)',
              mb: 1
            }}>
              <Typography variant="caption" fontWeight={600} color="primary.main" display="block" sx={{ mb: 0.5 }}>
                🚀 Demo Credentials
              </Typography>
              {[{ field: 'email', label: 'Email', value: DEMO.email }, { field: 'password', label: 'Password', value: DEMO.password }].map(({ field, label, value }) => (
                <Box key={field} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: field === 'email' ? 0.25 : 0 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    <span style={{ color: '#888' }}>{label}: </span>{value}
                  </Typography>
                  <IconButton size="small" onClick={() => handleCopy(field)} sx={{ ml: 1, color: copied[field] ? 'success.main' : 'primary.main' }}>
                    {copied[field] ? <Check sx={{ fontSize: 13 }} /> : <ContentCopy sx={{ fontSize: 13 }} />}
                  </IconButton>
                </Box>
              ))}
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" display="inline">
                Don't have an account?{' '}
              </Typography>
              <Button
                variant="text"
                onClick={() => { setIsRegister(true); setError(""); }}
                sx={{ fontWeight: 600, p: 0, minWidth: 'auto', textTransform: 'none' }}
              >
                Register
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;