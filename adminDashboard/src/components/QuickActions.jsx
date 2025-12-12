import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
  Badge,
  Avatar,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PhotoCamera as PhotoIcon,
  VideoLibrary as VideoIcon,
  Code as CodeIcon,
  Work as WorkIcon,
  EmojiEvents as AwardIcon,
  Groups as GroupIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  FileCopy as CopyIcon,
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Backup as BackupIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
  TrendingUp as TrendingIcon,
  CheckCircleOutline,
} from '@mui/icons-material';

const QuickActions = ({ onAction }) => {
  const primaryActions = [
    {
      id: 1,
      title: 'Add New Project',
      description: 'Create a new portfolio project',
      icon: <CodeIcon />,
      color: '#4caf50',
      action: () => onAction('projects'),
      badge: 'New',
    },
    {
      id: 2,
      title: 'Update Profile',
      description: 'Edit personal information',
      icon: <PersonIcon />,
      color: '#2196f3',
      action: () => onAction('user'),
      badge: 'Updated',
    },
    {
      id: 3,
      title: 'Upload Media',
      description: 'Add photos and videos',
      icon: <PhotoIcon />,
      color: '#f44336',
      action: () => onAction('gallery'),
    },
    {
      id: 4,
      title: 'Add Achievement',
      description: 'Add awards and certifications',
      icon: <AwardIcon />,
      color: '#ff9800',
      action: () => onAction('achievements'),
    },
  ];

  const secondaryActions = [
    {
      id: 5,
      title: 'Manage Experience',
      icon: <WorkIcon />,
      action: () => onAction('experience'),
    },
    {
      id: 6,
      title: 'Community Activities',
      icon: <GroupIcon />,
      action: () => onAction('extracurricular'),
    },
    {
      id: 7,
      title: 'Video Content',
      icon: <VideoIcon />,
      action: () => onAction('videos'),
    },
    {
      id: 8,
      title: 'Dashboard Settings',
      icon: <SettingsIcon />,
      action: () => onAction('settings'),
    },
  ];

  const utilityActions = [
    {
      id: 9,
      title: 'Export Data',
      icon: <DownloadIcon />,
      action: () => handleExport(),
      description: 'Download portfolio data',
    },
    {
      id: 10,
      title: 'Import Data',
      icon: <UploadIcon />,
      action: () => handleImport(),
      description: 'Upload portfolio data',
    },
    {
      id: 11,
      title: 'Backup',
      icon: <BackupIcon />,
      action: () => handleBackup(),
      description: 'Create backup',
    },
    {
      id: 12,
      title: 'Preview Site',
      icon: <VisibilityIcon />,
      action: () => window.open('/', '_blank'),
      description: 'View live portfolio',
    },
  ];

  const stats = [
    { label: 'Projects', value: '3', change: '+1', icon: <CodeIcon />, color: '#4caf50' },
    { label: 'Photos', value: '15', change: '+3', icon: <PhotoIcon />, color: '#2196f3' },
    { label: 'Videos', value: '8', change: '+2', icon: <VideoIcon />, color: '#f44336' },
    { label: 'Achievements', value: '12', change: '+4', icon: <AwardIcon />, color: '#ff9800' },
  ];

  const handleExport = () => {
    // Export functionality
    console.log('Exporting data...');
  };

  const handleImport = () => {
    // Import functionality
    console.log('Importing data...');
  };

  const handleBackup = () => {
    // Backup functionality
    console.log('Creating backup...');
  };

  const handleQuickEdit = (section) => {
    onAction(section);
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Quick Actions
      </Typography>

      {/* Stats Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Portfolio Overview
        </Typography>
        <Grid container spacing={2}>
          {stats.map((stat) => (
            <Grid item xs={6} key={stat.label}>
              <Paper
                sx={{
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'action.hover',
                  borderRadius: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: stat.color,
                    color: 'white',
                    width: 40,
                    height: 40,
                    mr: 1.5,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6">{stat.value}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                  {stat.change && (
                    <Chip
                      label={stat.change}
                      size="small"
                      color="success"
                      sx={{ ml: 1, height: 18 }}
                    />
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Primary Actions */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Quick Create
        </Typography>
        <Grid container spacing={2}>
          {primaryActions.map((action) => (
            <Grid item xs={12} key={action.id}>
              <Card
                sx={{
                  bgcolor: 'background.default',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                }}
                onClick={action.action}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: action.color,
                      color: 'white',
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    {action.icon}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1">{action.title}</Typography>
                      {action.badge && (
                        <Chip
                          label={action.badge}
                          size="small"
                          color="primary"
                          sx={{ height: 20 }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Secondary Actions */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Quick Navigation
        </Typography>
        <List sx={{ p: 0 }}>
          {secondaryActions.map((action) => (
            <ListItemButton
              key={action.id}
              onClick={action.action}
              sx={{
                mb: 1,
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemIcon>{action.icon}</ListItemIcon>
              <ListItemText primary={action.title} />
              <IconButton size="small">
                <EditIcon />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Utility Actions */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Utilities
        </Typography>
        <Grid container spacing={1}>
          {utilityActions.map((action) => (
            <Grid item xs={6} key={action.id}>
              <Tooltip title={action.description}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  startIcon={action.icon}
                  onClick={action.action}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  {action.title}
                </Button>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recent Updates */}
      <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle1" gutterBottom>
          Recent Updates
        </Typography>
        <List dense sx={{ p: 0 }}>
          <ListItemButton
            sx={{
              borderRadius: 1,
              mb: 1,
            }}
            onClick={() => onAction('projects')}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CodeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="E-Commerce Platform"
              secondary="Updated 2 hours ago"
            />
            <Chip label="Live" size="small" color="success" />
          </ListItemButton>
          <ListItemButton
            sx={{
              borderRadius: 1,
              mb: 1,
            }}
            onClick={() => onAction('gallery')}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <PhotoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Profile Photos"
              secondary="Added 4 hours ago"
            />
            <Chip label="3 new" size="small" />
          </ListItemButton>
          <ListItemButton
            sx={{
              borderRadius: 1,
            }}
            onClick={() => onAction('achievements')}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <AwardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="New Award"
              secondary="Added 2 days ago"
            />
            <Chip label="Featured" size="small" color="warning" />
          </ListItemButton>
        </List>
      </Box>

      {/* Quick Edit Tools */}
      <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle1" gutterBottom>
          Quick Edit
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {[
            { label: 'Social Links', icon: <ShareIcon />, section: 'user' },
            { label: 'Skills', icon: <StarIcon />, section: 'about' },
            { label: 'Bio', icon: <PersonIcon />, section: 'user' },
            { label: 'Contact', icon: <EmailIcon />, section: 'user' },
          ].map((tool) => (
            <Chip
              key={tool.label}
              icon={tool.icon}
              label={tool.label}
              onClick={() => handleQuickEdit(tool.section)}
              variant="outlined"
              size="small"
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Stack>
      </Box>

      {/* Speed Dial for Mobile */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 3 }}>
        <SpeedDial
          ariaLabel="Quick actions"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {primaryActions.map((action) => (
            <SpeedDialAction
              key={action.id}
              icon={action.icon}
              tooltipTitle={action.title}
              onClick={action.action}
            />
          ))}
        </SpeedDial>
      </Box>

      {/* System Status */}
      <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" gutterBottom>
          System Status
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<CheckCircleOutline />}
            label="All Systems Operational"
            color="success"
            size="small"
          />
          <Button
            size="small"
            startIcon={<RefreshIcon />}
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default QuickActions;