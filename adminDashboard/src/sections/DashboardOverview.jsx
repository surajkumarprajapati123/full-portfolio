import React from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  IconButton,
  AvatarGroup,
  Avatar,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  People,
  PhotoLibrary,
  Code,
  MoreVert,
  CheckCircle,
  Warning,
  Error,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { alpha, useTheme } from '@mui/material/styles';

const StatCard = ({ title, value, change, icon, color }) => {
  const theme = useTheme();
  
  return (
    <motion.div whileHover={{ y: -4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: '100%',
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.5)} 100%)`,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight="500">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, mb: 0.5 }}>
              {value}
            </Typography>
            {change && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUp sx={{ fontSize: 16, color: change > 0 ? 'success.main' : 'error.main' }} />
                <Typography
                  variant="caption"
                  color={change > 0 ? 'success.main' : 'error.main'}
                  fontWeight="500"
                >
                  {change > 0 ? '+' : ''}{change}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  vs last month
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: alpha(color, 0.1),
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

const ProjectProgress = () => {
  const projects = [
    { name: 'E-Commerce Platform', progress: 85, status: 'active', team: 3 },
    { name: 'Mobile App Redesign', progress: 60, status: 'active', team: 4 },
    { name: 'API Integration', progress: 30, status: 'pending', team: 2 },
    { name: 'Dashboard Analytics', progress: 100, status: 'completed', team: 3 },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${useTheme().palette.divider}`,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="600">
          Project Progress
        </Typography>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {projects.map((project, index) => (
          <Box key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight="500">
                {project.name}
              </Typography>
              <Typography variant="body2" fontWeight="600" color="primary">
                {project.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={project.progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  bgcolor: project.status === 'completed' ? 'success.main' : 'primary.main',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Chip
                label={project.status}
                size="small"
                color={project.status === 'completed' ? 'success' : project.status === 'active' ? 'primary' : 'warning'}
                variant="outlined"
                sx={{ height: 22 }}
              />
              <AvatarGroup total={project.team} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 12 } }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </AvatarGroup>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const SystemStatus = () => {
  const services = [
    { name: 'Database', status: 'operational', response: '45ms' },
    { name: 'API Server', status: 'operational', response: '120ms' },
    { name: 'CDN', status: 'degraded', response: '250ms' },
    { name: 'Authentication', status: 'operational', response: '85ms' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle sx={{ color: 'success.main', fontSize: 16 }} />;
      case 'degraded':
        return <Warning sx={{ color: 'warning.main', fontSize: 16 }} />;
      case 'down':
        return <Error sx={{ color: 'error.main', fontSize: 16 }} />;
      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${useTheme().palette.divider}`,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" fontWeight="600" gutterBottom>
        System Status
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {services.map((service, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              borderRadius: 2,
              bgcolor: 'action.hover',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {getStatusIcon(service.status)}
              <Box>
                <Typography variant="body2" fontWeight="500">
                  {service.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Response time: {service.response}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={service.status}
              size="small"
              color={
                service.status === 'operational'
                  ? 'success'
                  : service.status === 'degraded'
                  ? 'warning'
                  : 'error'
              }
              variant="filled"
              sx={{ height: 24 }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total Visitors',
      value: '12,458',
      change: 12.5,
      icon: <People />,
      color: '#2196f3',
    },
    {
      title: 'Gallery Items',
      value: '48',
      change: 8.2,
      icon: <PhotoLibrary />,
      color: '#4caf50',
    },
    {
      title: 'Active Projects',
      value: '7',
      change: -2.1,
      icon: <Code />,
      color: '#ff9800',
    },
    {
      title: 'User Engagement',
      value: '86%',
      change: 5.3,
      icon: <TrendingUp />,
      color: '#9c27b0',
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your portfolio today.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <ProjectProgress />
        </Grid>
        <Grid item xs={12} lg={4}>
          <SystemStatus />
        </Grid>
      </Grid>

      {/* Recent Activity Preview */}
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 3,
          border: `1px solid ${useTheme().palette.divider}`,
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="600">
            Recent Activity
          </Typography>
          <Chip label="Last 24 hours" size="small" />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { action: 'New project published', time: '2 hours ago', user: 'Alex Johnson' },
            { action: 'Gallery images updated', time: '4 hours ago', user: 'Sarah Wilson' },
            { action: 'Profile information edited', time: '6 hours ago', user: 'Alex Johnson' },
          ].map((activity, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: 'action.hover',
              }}
            >
              <Avatar sx={{ width: 32, height: 32 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight="500">
                  {activity.action}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  by {activity.user} • {activity.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardOverview;