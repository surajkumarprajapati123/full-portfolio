import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  YouTube as YouTubeIcon,
  Visibility as ViewsIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Link as LinkIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const VideoManagement = () => {
  const [videos, setVideos] = useState(portfolioData.videos);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    youtubeId: '',
    thumbnail: '',
    projectId: '',
    duration: '',
    views: '',
    uploadDate: new Date().toISOString().split('T')[0],
    featured: false,
    category: 'projectDemo'
  });
  const [activeTab, setActiveTab] = useState(0);
  const [youtubeInfo, setYoutubeInfo] = useState({ loading: false, error: null });

  const categories = [
    { value: 'projectDemo', label: 'Project Demo', icon: '📱' },
    { value: 'techTalk', label: 'Tech Talk', icon: '🎤' },
    { value: 'tutorial', label: 'Tutorial', icon: '📚' }
  ];

  const projects = portfolioData.projects;

  const handleAddNew = () => {
    setEditingVideo(null);
    setNewVideo({
      title: '',
      description: '',
      youtubeId: '',
      thumbnail: '',
      projectId: '',
      duration: '',
      views: '',
      uploadDate: new Date().toISOString().split('T')[0],
      featured: false,
      category: 'projectDemo'
    });
    setOpenDialog(true);
  };

  const handleEdit = (video, type) => {
    setEditingVideo({ ...video, type });
    setNewVideo({ 
      ...video, 
      category: type === 'projectDemo' ? 'projectDemo' : 
                type === 'techTalk' ? 'techTalk' : 'tutorial'
    });
    setOpenDialog(true);
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      const updatedVideos = { ...videos };
      if (type === 'projectDemo') {
        updatedVideos.projectDemos = updatedVideos.projectDemos.filter(v => v.id !== id);
      } else if (type === 'techTalk') {
        updatedVideos.techTalks = updatedVideos.techTalks.filter(v => v.id !== id);
      } else if (type === 'tutorial') {
        updatedVideos.tutorials = updatedVideos.tutorials.filter(v => v.id !== id);
      }
      setVideos(updatedVideos);
    }
  };

  const handleSave = () => {
    const videoToSave = {
      ...newVideo,
      id: editingVideo ? editingVideo.id : Date.now()
    };

    const updatedVideos = { ...videos };

    if (editingVideo) {
      if (editingVideo.type === 'projectDemo') {
        const index = updatedVideos.projectDemos.findIndex(v => v.id === editingVideo.id);
        updatedVideos.projectDemos[index] = videoToSave;
      } else if (editingVideo.type === 'techTalk') {
        const index = updatedVideos.techTalks.findIndex(v => v.id === editingVideo.id);
        updatedVideos.techTalks[index] = videoToSave;
      } else if (editingVideo.type === 'tutorial') {
        const index = updatedVideos.tutorials.findIndex(v => v.id === editingVideo.id);
        updatedVideos.tutorials[index] = videoToSave;
      }
    } else {
      if (newVideo.category === 'projectDemo') {
        updatedVideos.projectDemos.push(videoToSave);
      } else if (newVideo.category === 'techTalk') {
        updatedVideos.techTalks.push(videoToSave);
      } else if (newVideo.category === 'tutorial') {
        updatedVideos.tutorials.push(videoToSave);
      }
    }

    setVideos(updatedVideos);
    setOpenDialog(false);
    setEditingVideo(null);
  };

  const handleYoutubeIdChange = (youtubeId) => {
    setNewVideo({ ...newVideo, youtubeId });
    
    // Auto-generate thumbnail URL
    if (youtubeId && youtubeId.length === 11) {
      const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
      setNewVideo(prev => ({ ...prev, thumbnail: thumbnailUrl }));
      
      // You could fetch video info from YouTube API here
      // fetchVideoInfo(youtubeId);
    }
  };

  const fetchVideoInfo = async (videoId) => {
    setYoutubeInfo({ loading: true, error: null });
    try {
      // In a real app, you would use YouTube Data API
      // const response = await fetch(`YOUR_YOUTUBE_API_ENDPOINT?id=${videoId}`);
      // const data = await response.json();
      
      // For demo purposes, we'll simulate an API call
      setTimeout(() => {
        // Simulated response
        const mockData = {
          title: "Sample YouTube Video",
          duration: "10:30",
          views: "15,234",
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        };
        
        setNewVideo(prev => ({
          ...prev,
          title: mockData.title,
          duration: mockData.duration,
          views: mockData.views,
          thumbnail: mockData.thumbnail
        }));
        
        setYoutubeInfo({ loading: false, error: null });
      }, 1000);
      
    } catch (error) {
      setYoutubeInfo({ loading: false, error: 'Failed to fetch video info' });
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getVideosByType = (type) => {
    switch(type) {
      case 0: return videos.projectDemos;
      case 1: return videos.techTalks;
      case 2: return videos.tutorials;
      default: return [];
    }
  };

  const getVideoType = (type) => {
    switch(type) {
      case 0: return 'projectDemo';
      case 1: return 'techTalk';
      case 2: return 'tutorial';
      default: return 'projectDemo';
    }
  };

  const renderVideoCard = (video, type) => (
    <Grid item xs={12} sm={6} md={4} key={video.id}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="180"
            image={video.thumbnail}
            alt={video.title}
            sx={{ objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              px: 1,
              py: 0.5,
              borderBottomLeftRadius: 4,
            }}
          >
            {video.duration}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              p: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ViewsIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption">{video.views} views</Typography>
            </Box>
            {video.featured && <StarIcon sx={{ fontSize: 16, color: 'gold' }} />}
          </Box>
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '1rem', mb: 1 }}>
            {video.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {video.description.substring(0, 100)}...
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Chip 
              label={video.category || type} 
              size="small" 
              icon={<YouTubeIcon />}
            />
            <Typography variant="caption" color="text.secondary">
              {video.uploadDate}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <IconButton size="small" onClick={() => handleEdit(video, getVideoType(activeTab))}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => handleDelete(video.id, getVideoType(activeTab))}>
            <DeleteIcon />
          </IconButton>
          <IconButton 
            size="small" 
            component="a" 
            href={`https://youtube.com/watch?v=${video.youtubeId}`} 
            target="_blank"
          >
            <PlayIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Video Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add New Video
        </Button>
      </Box>

      {/* YouTube Channel Info */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" gutterBottom>
              YouTube Channel
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {videos.youtubeChannel.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
              <Box>
                <Typography variant="subtitle2">Subscribers</Typography>
                <Typography variant="h6">{videos.youtubeChannel.subscribers}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Total Views</Typography>
                <Typography variant="h6">{videos.youtubeChannel.totalViews}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Joined</Typography>
                <Typography variant="body2">{videos.youtubeChannel.joinDate}</Typography>
              </Box>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<YouTubeIcon />}
            href={videos.youtubeChannel.url}
            target="_blank"
          >
            View Channel
          </Button>
        </Box>
      </Paper>

      {/* Video Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label={`Project Demos (${videos.projectDemos.length})`} />
          <Tab label={`Tech Talks (${videos.techTalks.length})`} />
          <Tab label={`Tutorials (${videos.tutorials.length})`} />
        </Tabs>
      </Paper>

      {/* Video Grid */}
      <Grid container spacing={3}>
        {getVideosByType(activeTab).map(video => renderVideoCard(video, activeTab))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {editingVideo ? 'Edit Video' : 'Add New Video'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Video Category</InputLabel>
                <Select
                  value={newVideo.category}
                  label="Video Category"
                  onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                  disabled={!!editingVideo}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="YouTube Video ID"
                value={newVideo.youtubeId}
                onChange={(e) => handleYoutubeIdChange(e.target.value)}
                placeholder="Enter 11-character YouTube ID"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <YouTubeIcon />
                    </InputAdornment>
                  ),
                  endAdornment: youtubeInfo.loading && (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ),
                }}
                helperText="The 11-character ID from YouTube URL (e.g., dQw4w9WgXcQ)"
                required
              />
              {newVideo.youtubeId.length === 11 && (
                <Alert severity="success" sx={{ mt: 1 }}>
                  Valid YouTube ID detected
                </Alert>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Video Title"
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Thumbnail URL"
                value={newVideo.thumbnail}
                onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
                helperText="Will auto-generate from YouTube ID"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Duration"
                placeholder="e.g., 8:45"
                value={newVideo.duration}
                onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
              />
            </Grid>

            {newVideo.category === 'projectDemo' && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Related Project</InputLabel>
                  <Select
                    value={newVideo.projectId || ''}
                    label="Related Project"
                    onChange={(e) => setNewVideo({ ...newVideo, projectId: e.target.value })}
                  >
                    <MenuItem value="">None</MenuItem>
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.id}>
                        {project.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {newVideo.category === 'techTalk' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event"
                  value={newVideo.event || ''}
                  onChange={(e) => setNewVideo({ ...newVideo, event: e.target.value })}
                  placeholder="e.g., React Conf 2023"
                />
              </Grid>
            )}

            {newVideo.category === 'tutorial' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Difficulty Level"
                  value={newVideo.difficulty || ''}
                  onChange={(e) => setNewVideo({ ...newVideo, difficulty: e.target.value })}
                  placeholder="e.g., Beginner, Intermediate, Advanced"
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Views"
                value={newVideo.views}
                onChange={(e) => setNewVideo({ ...newVideo, views: e.target.value })}
                placeholder="e.g., 15,234"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Upload Date"
                type="date"
                value={newVideo.uploadDate}
                onChange={(e) => setNewVideo({ ...newVideo, uploadDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newVideo.featured}
                    onChange={(e) => setNewVideo({ ...newVideo, featured: e.target.checked })}
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon />}
                  />
                }
                label="Featured Video"
              />
            </Grid>

            {/* Thumbnail Preview */}
            {newVideo.thumbnail && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Thumbnail Preview
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img
                    src={newVideo.thumbnail}
                    alt="Thumbnail preview"
                    style={{ width: 200, height: 112, objectFit: 'cover', borderRadius: 4 }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x112?text=Thumbnail+Error';
                    }}
                  />
                  <Button
                    size="small"
                    onClick={() => {
                      const newThumbnail = `https://img.youtube.com/vi/${newVideo.youtubeId}/maxresdefault.jpg`;
                      setNewVideo({ ...newVideo, thumbnail: newThumbnail });
                    }}
                    disabled={!newVideo.youtubeId || newVideo.youtubeId.length !== 11}
                  >
                    Regenerate from YouTube
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={!newVideo.youtubeId || !newVideo.title}>
            {editingVideo ? 'Update Video' : 'Add Video'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VideoManagement;