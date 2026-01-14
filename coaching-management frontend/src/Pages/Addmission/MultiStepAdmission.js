import React, { useState, useEffect } from "react";
import { Box, Button, Card, Stepper, Step, StepLabel, TextField, MenuItem, Select, InputLabel, FormControl, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../../apis/apiRequest";

const steps = ["Personal Info", "Academic Details", "Course Selection"];

const MultiStepAdmission = ({ onSubmit, sendStudentData }) => {
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Full Name" name="studentname" value={formData.studentname} onChange={handleChange} required fullWidth />
            <TextField label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} fullWidth />
            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth />
            <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required fullWidth />
            <TextField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Highest Qualification</InputLabel>
              <Select name="highestQualification" value={formData.highestQualification} onChange={handleChange} label="Highest Qualification">
                <MenuItem value="ssc">SSC (10th)</MenuItem>
                <MenuItem value="hsc">HSC (12th)</MenuItem>
                <MenuItem value="bachelors">Bachelor's Degree</MenuItem>
                <MenuItem value="masters">Master's Degree</MenuItem>
                <MenuItem value="phd">PhD</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Aadhaar Card" name="aadharCard" value={formData.aadharCard} onChange={handleChange} fullWidth />
            <TextField label="PAN Card (Optional)" name="panCard" value={formData.panCard} onChange={handleChange} fullWidth />
            <TextField label="Address" name="address" value={formData.address} onChange={handleChange} multiline rows={3} fullWidth />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Select Course</InputLabel>
              <Select name="selectCourse" value={formData.selectCourse} onChange={handleChange} label="Select Course">
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course.title}>{course.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Date of Joining" name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3, textAlign: 'center' }}>
        {sendStudentData ? 'Update Student' : 'Add New Student'}
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? (sendStudentData ? 'Update' : 'Submit') : 'Next'}
        </Button>
      </Box>
    </Card>
  );
};

export default MultiStepAdmission;
