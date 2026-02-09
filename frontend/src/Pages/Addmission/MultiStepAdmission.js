import React, { useState, useEffect } from "react";
import { Box, Button, Card, Stepper, Step, StepLabel, TextField, MenuItem, Select, InputLabel, FormControl, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../../apis/apiRequest";

const steps = ["Personal Info", "Academic Details", "Course Selection"];

const MultiStepAdmission = ({ onSubmit, sendStudentData, showSignInLink, onSignInClick }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    studentname: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    gender: "",
    dateOfJoining: "",
    aadharCard: "",
    panCard: "",
    highestQualification: "",
    selectCourse: "",
    address: "",
    password: "",
    studentId: "",
    recStatus: "active",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (sendStudentData) {
      setFormData(sendStudentData);
    }
    fetchCourses();
  }, [sendStudentData]);

  const fetchCourses = async () => {
    try {
      const res = await instance.get('/course/');
      setCourses(res.data.data);
    } catch (error) {
      console.error('Failed to fetch courses');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onSubmit(formData);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField label="Full Name" name="studentname" value={formData.studentname} onChange={handleChange} required fullWidth size="small" InputLabelProps={{ style: { fontSize: '0.875rem' } }} sx={{ '& .MuiInputBase-root': { height: 32 } }} />
            <TextField label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} fullWidth size="small" InputLabelProps={{ style: { fontSize: '0.875rem' } }} sx={{ '& .MuiInputBase-root': { height: 32 } }} />
            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth size="small" InputLabelProps={{ style: { fontSize: '0.875rem' } }} sx={{ '& .MuiInputBase-root': { height: 32 } }} />
            <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required fullWidth size="small" InputLabelProps={{ style: { fontSize: '0.875rem' } }} sx={{ '& .MuiInputBase-root': { height: 32 } }} />
            <TextField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} InputLabelProps={{ shrink: true, style: { fontSize: '0.875rem' } }} fullWidth size="small" sx={{ '& .MuiInputBase-root': { height: 32 } }} />
            <FormControl fullWidth size="small" sx={{ '& .MuiInputBase-root': { height: 32 } }}>
              <InputLabel sx={{ fontSize: '0.875rem' }}>Gender</InputLabel>
              <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ style: { fontSize: '0.875rem' } }}
              sx={{ '& .MuiInputBase-root': { height: 32 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControl fullWidth size="small" sx={{ '& .MuiInputBase-root': { height: 32 } }}>
              <InputLabel sx={{ fontSize: '0.875rem' }}>Highest Qualification</InputLabel>
              <Select name="highestQualification" value={formData.highestQualification} onChange={handleChange} label="Highest Qualification">
                <MenuItem value="ssc">SSC (10th)</MenuItem>
                <MenuItem value="hsc">HSC (12th)</MenuItem>
                <MenuItem value="bachelors">Bachelor's Degree</MenuItem>
                <MenuItem value="masters">Master's Degree</MenuItem>
                <MenuItem value="phd">PhD</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Aadhaar Card" name="aadharCard" value={formData.aadharCard} onChange={handleChange} fullWidth size="small" InputLabelProps={{ style: { fontSize: '0.875rem' } }} sx={{ '& .MuiInputBase-root': { height: 32 } }} />
            <TextField label="PAN Card (Optional)" name="panCard" value={formData.panCard} onChange={handleChange} fullWidth size="small" InputLabelProps={{ style: { fontSize: '0.875rem' } }} sx={{ '& .MuiInputBase-root': { height: 32 } }} />
            <TextField label="Address" name="address" value={formData.address} onChange={handleChange} multiline rows={2} fullWidth size="small" InputLabelProps={{ style: { fontSize: '0.875rem' } }} />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControl fullWidth size="small" sx={{ '& .MuiInputBase-root': { height: 32 } }}>
              <InputLabel sx={{ fontSize: '0.875rem' }}>Select Course</InputLabel>
              <Select name="selectCourse" value={formData.selectCourse} onChange={handleChange} label="Select Course">
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course.title}>{course.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Date of Joining" name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} InputLabelProps={{ shrink: true, style: { fontSize: '0.875rem' } }} fullWidth size="small" sx={{ '& .MuiInputBase-root': { height: 32 } }} />
            <FormControl fullWidth size="small" sx={{ '& .MuiInputBase-root': { height: 32 } }}>
              <InputLabel sx={{ fontSize: '0.875rem' }}>Course Status</InputLabel>
              <Select name="recStatus" value={formData.recStatus} onChange={handleChange} label="Course Status">
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="In_Active">Inactive</MenuItem>
                <MenuItem value="courseCompleted">Course Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{ 
      p: 1.5, 
      width: '100%',
      maxWidth: 380, 
      mx: 'auto',
      my: 2,
      borderRadius: 2,
      boxShadow: 4
    }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 1, mt: 0.5, textAlign: 'center', fontSize: '1.30rem' }}>
        {sendStudentData ? 'Update Student' : 'Create Account'}
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 1.6 }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel 
              sx={{ 
                '& .MuiStepLabel-label': { 
                  fontSize: '0.75rem',
                  mt: 0.5
                } 
              }}
            >
              {label.split(' ')[0]}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <AnimatePresence mode="wait" custom={activeStep}>
        <motion.div
          key={activeStep}
          custom={activeStep}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.8, gap: 2 }}>
        <Button disabled={activeStep === 0} onClick={handleBack} size="small" sx={{ color: 'text.secondary', py: 0.5 }}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} size="small" sx={{ px: 2, py: 0.5 }}>
          {activeStep === steps.length - 1 ? (sendStudentData ? 'Update' : 'Register') : 'Next'}
        </Button>
      </Box>

      {showSignInLink && (
        <Box sx={{ textAlign: 'center', mt: 0.8, pt: 0.8, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" display="inline">
            Already have an account?{' '}
          </Typography>
          <Button
            variant="text"
            onClick={onSignInClick}
            sx={{ fontWeight: 600, p: 0, minWidth: 'auto' }}
          >
            Sign In
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default MultiStepAdmission;
