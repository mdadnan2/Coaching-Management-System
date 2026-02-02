import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { entry } from "../reducers/LoginSlice";
import { Box, Container, TextField, Button, Typography, Paper, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, School } from "@mui/icons-material";
import instance from "../apis/apiRequest";
import { student_Login, RegisterStudent } from "../apis/apiContsants";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({ 
    studentname: "", 
    email: "", 
    password: "", 
    phoneNumber: "",
    gender: "",
    address: "",
    dateOfBirth: "",
    dateOfJoining: new Date().toISOString().split('T')[0],
    highestQualification: "",
    selectCourse: "",
    studentId: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (isRegister) {
      setRegData({ ...regData, [e.target.name]: e.target.value });
    } else {
      setCred({ ...cred, [e.target.name]: e.target.value });
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        console.log('Registration payload:', regData);
        const response = await instance.post(RegisterStudent, regData);
        localStorage.setItem("coaching_app_auth_token", response.data.data.token);
        toast.success('Registration successful! Welcome!');
        setTimeout(() => dispatch(entry()), 500);
      } else {
        const response = await instance.post(student_Login, cred);
        localStorage.setItem("coaching_app_auth_token", response.data.data.token);
        toast.success('Welcome back!');
        setTimeout(() => dispatch(entry()), 500);
      }
    } catch (err) {
      setError(isRegister ? "Registration failed. Please try again." : "Invalid email or password");
      toast.error(isRegister ? 'Registration failed.' : 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isRegister ? 'Join our coaching platform' : 'Sign in to your coaching account'}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="studentname"
                  value={regData.studentname}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Student ID"
                  name="studentId"
                  value={regData.studentId}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
              </>
            )}
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={isRegister ? regData.email : cred.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            {isRegister && (
              <>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={regData.phoneNumber}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  select
                  label="Gender"
                  name="gender"
                  value={regData.gender}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                  SelectProps={{ native: true }}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </TextField>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={regData.address}
                  onChange={handleChange}
                  required
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={regData.dateOfBirth}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Highest Qualification"
                  name="highestQualification"
                  value={regData.highestQualification}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Select Course"
                  name="selectCourse"
                  value={regData.selectCourse}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
              </>
            )}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={isRegister ? regData.password : cred.password}
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
              {loading ? (isRegister ? 'Creating Account...' : 'Signing in...') : (isRegister ? 'Create Account' : 'Sign In')}
            </Button>
          </form>
          
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
            </Typography>
            <Button
              variant="text"
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
                setCred({ email: "", password: "" });
                setRegData({ 
                  studentname: "", 
                  email: "", 
                  password: "", 
                  phoneNumber: "",
                  gender: "",
                  address: "",
                  dateOfBirth: "",
                  dateOfJoining: new Date().toISOString().split('T')[0],
                  highestQualification: "",
                  selectCourse: "",
                  studentId: ""
                });
              }}
              sx={{ mt: 1, fontWeight: 600 }}
            >
              {isRegister ? 'Sign In' : 'Register Here'}
            </Button>
          </Box>
        </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;