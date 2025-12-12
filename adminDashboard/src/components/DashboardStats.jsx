// DashboardStats.jsx
import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  PhotoLibrary as PhotoIcon,
  VideoLibrary as VideoIcon,
  Code as CodeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon: Icon, color, progress }) => (
  <Paper sx={{ p: 3, height: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Icon sx={{ fontSize: 40, color, mr: 2 }} />
      <Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>
      </Box>
    </Box>
    {progress && (
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ mt: 2, height: 8, borderRadius: 4 }}
      />
    )}
  </Paper>
);

const DashboardStats = ({ data }) => {
  const stats = [
    {
      title: 'Total Photos',
      value: data.galleryStats.totalPhotos,
      icon: PhotoIcon,
      color: '#2196f3',
    },
    {
      title: 'Total Videos',
      value: data.videos.projectDemos.length + data.videos.techTalks.length + data.videos.tutorials.length,
      icon: VideoIcon,
      color: '#f44336',
    },
    {
      title: 'Projects',
      value: data.projects.length,
      icon: CodeIcon,
      color: '#4caf50',
    },
    {
      title: 'Experience',
      value: data.experience.length,
      icon: WorkIcon,
      color: '#ff9800',
    },
    {
      title: 'Achievements',
      value: data.achievements.awards.length + data.achievements.certifications.length,
      icon: StarIcon,
      color: '#9c27b0',
    },
    {
      title: 'Skills',
      value: data.about.skills.length,
      icon: SchoolIcon,
      color: '#00bcd4',
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStats;