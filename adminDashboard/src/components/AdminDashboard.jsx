import React, { useState } from 'react';
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
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
  useTheme,
  useMediaQuery,
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
  EmojiEvents as StarIcon,
  Groups as GroupsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Visibility as ViewIcon,
  ChevronLeft as ChevronLeftIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  Security as SecurityIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import UserManagement from '../sections/UserManagement';
import GalleryManagement from '../sections/GalleryManagement';
import ProjectManagement from '../sections/ProjectManagement';
import DashboardOverview from '../sections/DashboardOverview';

const drawerWidth = 280;

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const menuSections = [
    {
      title: 'MAIN',
      items: [
        { text: 'Dashboard', icon: <DashboardIcon />, path: 'dashboard' },
        { text: 'Analytics', icon: <BarChartIcon />, path: 'analytics' },
        { text: 'Activity Log', icon: <TimelineIcon />, path: 'activity' },
      ],
    },
    {
      title: 'CONTENT',
      items: [
        { text: 'User Profile', icon: <PersonIcon />, path: 'user' },
        { text: 'Gallery', icon: <PhotoIcon />, path: 'gallery' },
        { text: 'Videos', icon: <VideoIcon />, path: 'videos' },
        { text: 'Projects', icon: <CodeIcon />, path: 'projects' },
        { text: 'Experience', icon: <WorkIcon />, path: 'experience' },
        { text: 'Education', icon: <SchoolIcon />, path: 'education' },
        { text: 'Achievements', icon: <StarIcon />, path: 'achievements' },
        { text: 'Extracurricular', icon: <GroupsIcon />, path: 'extracurricular' },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { text: 'Security', icon: <SecurityIcon />, path: 'security' },
        { text: 'Backup', icon: <UploadIcon />, path: 'backup' },
        { text: 'Settings', icon: <SettingsIcon />, path: 'settings' },
      ],
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    setActiveSection(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderSection = () => {
    const sections = {
      dashboard: <DashboardOverview />,
      user: <UserManagement />,
      gallery: <GalleryManagement />,
      projects: <ProjectManagement />,
      analytics: <div>Analytics Section</div>,
      activity: <div>Activity Log Section</div>,
      security: <div>Security Section</div>,
      backup: <div>Backup Section</div>,
      settings: <div>Settings Section</div>,
    };
    return sections[activeSection] || <DashboardOverview />;
  };

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
        color: 'white',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${alpha('#fff', 0.1)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src="/logo.svg"
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'white',
              color: theme.palette.primary.main,
            }}
          >
            P
          </Avatar>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Typography variant="h6" fontWeight="600">
                  PortfolioPro
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Admin Panel
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        {!isMobile && (
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{ color: 'white' }}
          >
            <ChevronLeftIcon
              sx={{
                transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            />
          </IconButton>
        )}
      </Box>

      {/* Menu Sections */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {menuSections.map((section, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      px: 2,
                      py: 1,
                      opacity: 0.6,
                      letterSpacing: '1px',
                      display: 'block',
                    }}
                  >
                    {section.title}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
            <List disablePadding>
              {section.items.map((item) => (
                <ListItem
                  key={item.text}
                  component={motion.li}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  button
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    px: 2,
                    py: 1.5,
                    bgcolor:
                      activeSection === item.path
                        ? alpha('#fff', 0.15)
                        : 'transparent',
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.1),
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'white' }}>
                    {item.icon}
                  </ListItemIcon>
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              fontWeight={
                                activeSection === item.path ? '600' : '400'
                              }
                            >
                              {item.text}
                            </Typography>
                          }
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>

      {/* User Profile & Actions */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${alpha('#fff', 0.1)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            sx={{ width: 40, height: 40 }}
          />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ flex: 1 }}
              >
                <Typography variant="body2" fontWeight="600">
                  Admin User
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Super Administrator
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            sx={{ color: 'white', bgcolor: alpha('#fff', 0.1) }}
            onClick={() => navigate('/')}
          >
            <ViewIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ color: 'white', bgcolor: alpha('#fff', 0.1) }}
            onClick={() => {/* Handle notifications */}}
          >
            <NotificationsIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ color: 'white', bgcolor: alpha('#fff', 0.1) }}
            onClick={() => {/* Handle logout */}}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <CssBaseline />
      
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${collapsed ? 80 : drawerWidth}px)` },
          ml: { sm: `${collapsed ? 80 : drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          borderBottom: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
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
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" noWrap fontWeight="600" color="primary">
              {menuSections
                .flatMap(section => section.items)
                .find(item => item.path === activeSection)?.text || 'Dashboard'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {/* Display date or subtitle */}
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ color: 'text.secondary' }}>
              <SearchIcon />
            </IconButton>
            <IconButton sx={{ color: 'text.secondary' }}>
              <NotificationsIcon />
            </IconButton>
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              sx={{ width: 36, height: 36 }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{
          width: { sm: collapsed ? 80 : drawerWidth },
          flexShrink: { sm: 0 },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: collapsed ? 80 : drawerWidth,
                borderRight: 'none',
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${collapsed ? 80 : drawerWidth}px)` },
          ml: { sm: `${collapsed ? 80 : drawerWidth}px` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ px: { xs: 0, sm: 2 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;