import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Divider, Switch } from "@mui/material";
import { Dashboard, AccountCircle, LibraryBooks, Logout, Menu as MenuIcon, DarkMode, LightMode, Settings, Person } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/LoginSlice";
import { useDarkMode } from "../theme/DarkModeProvider";
import { motion } from "framer-motion";

const drawerWidth = 240;

const menuItems = [
  { path: "/", name: "Dashboard", icon: <Dashboard /> },
  { path: "/students", name: "Students", icon: <AccountCircle /> },
  { path: "/addCourse", name: "Courses", icon: <LibraryBooks /> },
  { path: "/profile", name: "Settings", icon: <Settings /> },
];

export default function ModernSidebar({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const currentTab = menuItems.find(item => item.path === location.pathname);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LibraryBooks sx={{ color: 'primary.main', fontSize: 32 }} />
        <Typography variant="h6" fontWeight={700}>
          Coaching
        </Typography>
      </Box>
      <Divider />
      <List sx={{ flex: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                borderRadius: 2,
                transition: 'all 0.2s',
                '&.active': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                  '&:hover': { bgcolor: 'primary.dark' }
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="text.primary" sx={{ flexGrow: 1 }}>
            {currentTab?.name || ''}
          </Typography>
          <IconButton onClick={toggleDarkMode} sx={{ mr: 1 }}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>A</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem component={NavLink} to="/profile" onClick={handleMenuClose}>
              <Person sx={{ mr: 1, fontSize: 20 }} /> View Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1, fontSize: 20 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', borderRight: 1, borderColor: 'divider' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: { xs: 2, sm: 2, md: 3 }, 
        width: { md: `calc(100% - ${drawerWidth}px)` }, 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        overflowX: 'hidden'
      }}>
        <Toolbar />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
}
