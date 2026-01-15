import React, { useState, useEffect } from "react";
import { Box, Card, Typography, TextField, Button, Avatar, Divider, Switch, Grid, Stack } from "@mui/material";
import { Edit, Save, Person, Lock, Palette, Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDarkMode } from "../../theme/DarkModeProvider";
import toast from "react-hot-toast";
import instance from "../../apis/apiRequest";

const Profile = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@coaching.com",
    phone: "9999999999",
    role: "Administrator",
    photo: ""
  });

  useEffect(() => {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
      setProfile(prev => ({ ...prev, photo: savedPhoto }));
    }
  }, []);
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true
  });

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setEditing(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoData = reader.result;
        setProfile({ ...profile, photo: photoData });
        localStorage.setItem('profilePhoto', photoData);
        toast.success("Photo updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    if (password.new !== password.confirm) {
      toast.error("Passwords don't match!");
      return;
    }
    if (!password.current || !password.new) {
      toast.error("Please fill all fields!");
      return;
    }
    
    instance.post('/student/change-password', {
      currentPassword: password.current,
      newPassword: password.new
    })
      .then(() => {
        toast.success("Password changed successfully!");
        setPassword({ current: "", new: "", confirm: "" });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to change password");
      });
  };

  const handleNotificationChange = (type) => {
    const newSettings = { ...notifications, [type]: !notifications[type] };
    setNotifications(newSettings);
    // Save to backend
    instance.post('/student/settings', newSettings)
      .then(() => toast.success('Settings saved!'))
      .catch(() => toast.error('Failed to save settings'));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1, fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
            Profile & Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your account settings and preferences
          </Typography>
        </Box>

        <Stack spacing={{ xs: 2, sm: 3 }}>
          <Card sx={{ p: { xs: 2, sm: 3 }, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, sm: 3 }, flexDirection: { xs: 'column', sm: 'row' }, textAlign: { xs: 'center', sm: 'left' } }}>
              <Avatar 
                src={profile.photo}
                sx={{ width: { xs: 70, sm: 80 }, height: { xs: 70, sm: 80 }, bgcolor: "primary.main", fontSize: { xs: 32, sm: 36 } }}
              >
                {!profile.photo && profile.name.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight={600} sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  {profile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.role}
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                startIcon={<Edit />}
                component="label"
                size="small"
                fullWidth={true}
                sx={{ maxWidth: { xs: '100%', sm: 'auto' } }}
              >
                Change Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </Button>
            </Box>
          </Card>

          <Card sx={{ p: { xs: 2, sm: 4 }, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: { xs: 2, sm: 3 }, flexWrap: 'wrap', gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Person />
                <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                  Personal Information
                </Typography>
              </Box>
              <Button
                variant={editing ? "contained" : "outlined"}
                startIcon={editing ? <Save /> : <Edit />}
                onClick={editing ? handleSave : () => setEditing(true)}
                size="small"
              >
                {editing ? "Save" : "Edit"}
              </Button>
            </Box>

            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!editing}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  value={profile.email}
                  disabled
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!editing}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Role"
                  value={profile.role}
                  disabled
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: { xs: 2, sm: 4 }, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: { xs: 2, sm: 3 } }}>
              <Lock />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Change Password
              </Typography>
            </Box>

            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12}>
                <TextField
                  label="Current Password"
                  type={showPassword.current ? "text" : "password"}
                  value={password.current}
                  onChange={(e) => setPassword({ ...password, current: e.target.value })}
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <Button onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })} sx={{ minWidth: 'auto', p: 1 }}>
                        {showPassword.current ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </Button>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="New Password"
                  type={showPassword.new ? "text" : "password"}
                  value={password.new}
                  onChange={(e) => setPassword({ ...password, new: e.target.value })}
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <Button onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })} sx={{ minWidth: 'auto', p: 1 }}>
                        {showPassword.new ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </Button>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  type={showPassword.confirm ? "text" : "password"}
                  value={password.confirm}
                  onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <Button onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })} sx={{ minWidth: 'auto', p: 1 }}>
                        {showPassword.confirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </Button>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handlePasswordChange} size="small" fullWidth={true} sx={{ maxWidth: { xs: '100%', sm: 'auto' } }}>
                  Update Password
                </Button>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: { xs: 2, sm: 4 }, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: { xs: 2, sm: 3 } }}>
              <Palette />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Preferences
              </Typography>
            </Box>

            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
                <Box>
                  <Typography variant="body1" fontWeight={500} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Dark Mode</Typography>
                  <Typography variant="caption" color="text.secondary">Toggle dark/light theme</Typography>
                </Box>
                <Switch checked={darkMode} onChange={toggleDarkMode} />
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
                <Box>
                  <Typography variant="body1" fontWeight={500} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Email Notifications</Typography>
                  <Typography variant="caption" color="text.secondary">Receive email updates</Typography>
                </Box>
                <Switch checked={notifications.email} onChange={() => handleNotificationChange('email')} />
              </Box>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default Profile;
