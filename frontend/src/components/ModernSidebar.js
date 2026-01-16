import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Divider, Switch } from "@mui/material";
import { Dashboard, AccountCircle, LibraryBooks, Logout, Menu as MenuIcon, DarkMode, LightMode, Settings, Person, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/LoginSlice";
import { useDarkMode } from "../theme/DarkModeProvider";
import { motion } from "framer-motion";

const drawerWidth = 240;
const collapsedWidth = 70;

const menuItems = [
  { path: "/", name: "Dashboard", icon: <Dashboard /> },
  { path: "/students", name: "Students", icon: <AccountCircle /> },
  { path: "/addCourse", name: "Courses", icon: <LibraryBooks /> },
  { path: "/profile", name: "Settings", icon: <Settings /> },
];

export default function ModernSidebar({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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

  const drawer = (isMobile = false) => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ p: (!isMobile && collapsed) ? 1.5 : 3, display: 'flex', alignItems: 'center', justifyContent: (!isMobile && collapsed) ? 'center' : 'space-between', gap: 1 }}>
        {(isMobile || !collapsed) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LibraryBooks sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h6" fontWeight={700}>
              Coaching
            </Typography>
          </Box>
        )}
        {!isMobile && collapsed && <LibraryBooks sx={{ color: 'primary.main', fontSize: 32 }} />}
        {!isMobile && (
          <IconButton onClick={() => setCollapsed(!collapsed)} size="small">
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </Box>
      <Divider />
      <List sx={{ flex: 1, px: (!isMobile && collapsed) ? 1 : 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={isMobile ? handleDrawerToggle : undefined}
              sx={{
                borderRadius: 2,
                transition: 'all 0.2s',
                justifyContent: (!isMobile && collapsed) ? 'center' : 'flex-start',
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
              <ListItemIcon sx={{ minWidth: (!isMobile && collapsed) ? 0 : 40, color: 'text.secondary', justifyContent: 'center' }}>
                {item.icon}
              </ListItemIcon>
              {(isMobile || !collapsed) && <ListItemText primary={item.name} />}
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
          width: { md: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)` },
          ml: { md: `${collapsed ? collapsedWidth : drawerWidth}px` },
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s',
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

      <Box component="nav" sx={{ width: { md: collapsed ? collapsedWidth : drawerWidth }, flexShrink: { md: 0 }, transition: 'width 0.3s' }}>
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
          {drawer(true)}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              width: collapsed ? collapsedWidth : drawerWidth, 
              boxSizing: 'border-box', 
              borderRight: 1, 
              borderColor: 'divider',
              transition: 'width 0.3s',
              overflowX: 'hidden'
            },
          }}
          open
        >
          {drawer(false)}
        </Drawer>
      </Box>

      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: { xs: 2, sm: 2, md: 3 }, 
        width: { md: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)` }, 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        overflowX: 'hidden',
        transition: 'all 0.3s'
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
