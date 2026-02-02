import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { entry } from "../reducers/LoginSlice";
import { Box, Container, TextField, Button, Typography, Paper, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, School } from "@mui/icons-material";
import instance from "../apis/apiRequest";
import { student_Login, RegisterStudent } from "../apis/apiContsants";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import MultiStepAdmission from '../Pages/Addmission/MultiStepAdmission';

const Login = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();

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
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}>
        <Container maxWidth="sm">
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
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4
    }}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <School sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your coaching account
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
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={cred.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?
            </Typography>
            <Button
              variant="text"
              onClick={() => {
                setIsRegister(true);
                setError("");
              }}
              sx={{ mt: 1, fontWeight: 600 }}
            >
              Register Here
            </Button>
          </Box>
        </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;