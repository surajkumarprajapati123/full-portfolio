import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Button,
  IconButton,
  Tooltip,
  LinearProgress,
  Badge,
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
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  AccessTime as TimeIcon,
  MoreVert as MoreIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { formatDistanceToNow, format } from 'date-fns';

const RecentActivity = () => {
  // Mock recent activities based on your portfolio data
  const activities = [
    {
      id: 1,
      type: 'project',
      action: 'created',
      title: 'E-Commerce Platform',
      user: 'Alex Johnson',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: <CodeIcon />,
      color: '#4caf50',
      details: 'Added new full-stack project',
    },
    {
      id: 2,
      type: 'gallery',
      action: 'updated',
      title: 'Profile Photos',
      user: 'Alex Johnson',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      icon: <PhotoIcon />,
      color: '#2196f3',
      details: 'Added 3 new profile photos',
    },
    {
      id: 3,
      type: 'video',
      action: 'uploaded',
      title: 'React Hooks Tutorial',
      user: 'Alex Johnson',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      icon: <VideoIcon />,
      color: '#f44336',
      details: 'Uploaded new tutorial video',
    },
    {
      id: 4,
      type: 'achievement',
      action: 'added',
      title: 'Best Open Source Project Award',
      user: 'Alex Johnson',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: <AwardIcon />,
      color: '#ff9800',
      details: 'Added new achievement',
    },
    {
      id: 5,
      type: 'experience',
      action: 'updated',
      title: 'Senior Frontend Developer',
      user: 'Alex Johnson',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: <WorkIcon />,
      color: '#9c27b0',
      details: 'Updated work experience',
    },
    {
      id: 6,
      type: 'community',
      action: 'added',
      title: 'React SF Meetup',
      user: 'Alex Johnson',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      icon: <GroupIcon />,
      color: '#00bcd4',
      details: 'Added community involvement',
    },
    {
      id: 7,
      type: 'user',
      action: 'updated',
      title: 'Profile Information',
      user: 'Alex Johnson',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      icon: <PersonIcon />,
      color: '#795548',
      details: 'Updated personal details',
    },
    {
      id: 8,
      type: 'project',
      action: 'published',
      title: 'TaskFlow Pro',
      user: 'Alex Johnson',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      icon: <CodeIcon />,
      color: '#4caf50',
      details: 'Published project to live',
    },
  ];

  const getActionIcon = (action) => {
    switch (action) {
      case 'created':
      case 'added':
      case 'uploaded':
      case 'published':
        return <CheckIcon sx={{ color: 'success.main' }} />;
      case 'updated':
        return <EditIcon sx={{ color: 'info.main' }} />;
      case 'deleted':
        return <DeleteIcon sx={{ color: 'error.main' }} />;
      default:
        return <InfoIcon sx={{ color: 'warning.main' }} />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'created':
      case 'added':
      case 'uploaded':
      case 'published':
        return 'success';
      case 'updated':
        return 'info';
      case 'deleted':
        return 'error';
      default:
        return 'warning';
    }
  };

  const formatTime = (timestamp) => {
    return formatDistanceToNow(timestamp, { addSuffix: true });
  };

  const getTypeLabel = (type) => {
    const typeLabels = {
      project: 'Project',
      gallery: 'Gallery',
      video: 'Video',
      achievement: 'Achievement',
      experience: 'Experience',
      community: 'Community',
      user: 'User',
    };
    return typeLabels[type] || type;
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Recent Activity</Typography>
        <Button 
          size="small" 
          endIcon={<ArrowIcon />}
          onClick={() => {/* Navigate to activity log */}}
        >
          View All
        </Button>
      </Box>

      {/* Activity Stats */}
      <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Activity Summary (Last 7 Days)
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4">{activities.length}</Typography>
            <Typography variant="caption" color="text.secondary">
              Total Activities
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="success.main">
                5
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Added
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="info.main">
                3
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Updated
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Activity Timeline */}
      <List sx={{ maxHeight: 400, overflow: 'auto' }}>
        {activities.map((activity, index) => (
          <React.Fragment key={activity.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                py: 2,
                px: 0,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: activity.color,
                    color: 'white',
                  }}
                >
                  {activity.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" component="span">
                      {activity.title}
                    </Typography>
                    <Chip
                      label={activity.action}
                      size="small"
                      color={getActionColor(activity.action)}
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      {getActionIcon(activity.action)}
                      <Box component="span" sx={{ ml: 1 }}>
                        {activity.details}
                      </Box>
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <TimeIcon sx={{ fontSize: 12, mr: 0.5 }} />
                        {formatTime(activity.timestamp)}
                      </Typography>
                      <Chip
                        label={getTypeLabel(activity.type)}
                        size="small"
                        sx={{ height: 20 }}
                      />
                    </Box>
                  </Box>
                }
              />
              <IconButton size="small" edge="end" aria-label="more">
                <MoreIcon />
              </IconButton>
            </ListItem>
            {index < activities.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>

      {/* Activity Summary Chart */}
      <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" gutterBottom>
          Activity Distribution
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[
            { type: 'Projects', count: 2, color: '#4caf50' },
            { type: 'Gallery', count: 1, color: '#2196f3' },
            { type: 'Videos', count: 1, color: '#f44336' },
            { type: 'Achievements', count: 1, color: '#ff9800' },
            { type: 'Experience', count: 1, color: '#9c27b0' },
            { type: 'Community', count: 1, color: '#00bcd4' },
            { type: 'User', count: 1, color: '#795548' },
          ].map((item) => (
            <Box key={item.type} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 100 }}>
                <Typography variant="caption">{item.type}</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={(item.count / activities.length) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'action.hover',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: item.color,
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: 40, textAlign: 'right' }}>
                <Typography variant="caption" fontWeight="bold">
                  {item.count}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Quick Stats */}
      <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" gutterBottom>
          Quick Stats
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: 'action.hover' }}>
              <Typography variant="caption" color="text.secondary">
                Most Active Day
              </Typography>
              <Typography variant="h6">
                {format(new Date(), 'EEEE')}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: 'action.hover' }}>
              <Typography variant="caption" color="text.secondary">
                Avg. Daily Activities
              </Typography>
              <Typography variant="h6">
                {(activities.length / 7).toFixed(1)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

// Import Grid at the top
import Grid from '@mui/material/Grid';

export default RecentActivity;