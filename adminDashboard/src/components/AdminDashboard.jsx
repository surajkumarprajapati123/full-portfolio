// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  PhotoLibrary as PhotoIcon,
  VideoLibrary as VideoIcon,
  Code as CodeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Groups as GroupsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardStats from './DashboardStats';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import { portfolioData } from '../../portfolioData';
import UserManagement from '../sections/UserManagement';
import GalleryManagement from '../sections/GalleryManagement';
import ProjectManagement from '../sections/ProjectManagement';

const drawerWidth = 240;

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: 'dashboard' },
    { text: 'User Profile', icon: <PersonIcon />, path: 'user' },
    { text: 'Gallery', icon: <PhotoIcon />, path: 'gallery' },
    { text: 'Videos', icon: <VideoIcon />, path: 'videos' },
    { text: 'Projects', icon: <CodeIcon />, path: 'projects' },
    { text: 'Experience', icon: <WorkIcon />, path: 'experience' },
    { text: 'Education', icon: <SchoolIcon />, path: 'education' },
    { text: 'Achievements', icon: <StarIcon />, path: 'achievements' },
    { text: 'Extracurricular', icon: <GroupsIcon />, path: 'extracurricular' },
    { text: 'Testimonials', icon: <PersonIcon />, path: 'testimonials' },
    { text: 'Settings', icon: <SettingsIcon />, path: 'settings' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    setActiveSection(path);
    navigate(`/admin/${path}`);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              Dashboard Overview
            </Typography>
            <DashboardStats data={portfolioData} />
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={8}>
                <RecentActivity />
              </Grid>
              <Grid item xs={12} md={4}>xda
                <QuickActions onAction={handleNavigation} />
              </Grid>
            </Grid>
          </Box>
        );
      case 'user':
        return <UserManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'projects':
        return <ProjectManagement />;
      // ... other cases for different sections
      default:
        return <DashboardStats data={portfolioData} />;
    }
  };

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" noWrap component="div">
          Portfolio Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={activeSection === item.path}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => navigate('/')}>
          <ListItemIcon>
            <ViewIcon />
          </ListItemIcon>
          <ListItemText primary="View Portfolio" />
        </ListItem>
        <ListItem button onClick={() => {/* Handle logout */}}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {menuItems.find(item => item.path === activeSection)?.text || 'Admin Dashboard'}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            src={portfolioData.user.avatar}
            sx={{ width: 40, height: 40 }}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container maxWidth="xl">
          {renderSection()}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;