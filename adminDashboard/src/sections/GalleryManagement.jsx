// GalleryManagement.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { portfolioData } from '../../portfolioData';

const GalleryManagement = () => {
  const [galleryData, setGalleryData] = useState(portfolioData.gallery);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    url: '',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    featured: false,
  });

  const tabs = ['Profile Photos', 'Project Photos', 'Event Photos'];

  const handleAddNew = () => {
    setEditingItem(null);
    setNewItem({
      url: '',
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      featured: false,
    });
    setOpenDialog(true);
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    setNewItem({ ...item });
    setOpenDialog(true);
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedData = { ...galleryData };
      if (type === 'profile') {
        updatedData.profilePhotos = updatedData.profilePhotos.filter(item => item.id !== id);
      } else if (type === 'project') {
        updatedData.projectPhotos = updatedData.projectPhotos.filter(item => item.id !== id);
      } else if (type === 'event') {
        updatedData.eventPhotos = updatedData.eventPhotos.filter(item => item.id !== id);
      }
      setGalleryData(updatedData);
    }
  };

  const handleSave = () => {
    const updatedData = { ...galleryData };
    const itemToSave = { ...newItem, id: editingItem ? editingItem.id : Date.now() };

    if (editingItem) {
      // Update existing item
      if (editingItem.type === 'profile') {
        const index = updatedData.profilePhotos.findIndex(item => item.id === editingItem.id);
        updatedData.profilePhotos[index] = itemToSave;
      } else if (editingItem.type === 'project') {
        const index = updatedData.projectPhotos.findIndex(item => item.id === editingItem.id);
        updatedData.projectPhotos[index] = itemToSave;
      } else if (editingItem.type === 'event') {
        const index = updatedData.eventPhotos.findIndex(item => item.id === editingItem.id);
        updatedData.eventPhotos[index] = itemToSave;
      }
    } else {
      // Add new item
      if (currentTab === 0) {
        updatedData.profilePhotos.push({ ...itemToSave, category: 'profile' });
      } else if (currentTab === 1) {
        updatedData.projectPhotos.push({ ...itemToSave, category: 'project' });
      } else if (currentTab === 2) {
        updatedData.eventPhotos.push({ ...itemToSave, category: 'event' });
      }
    }

    setGalleryData(updatedData);
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderGallery = () => {
    let items = [];
    let type = '';

    switch (currentTab) {
      case 0:
        items = galleryData.profilePhotos;
        type = 'profile';
        break;
      case 1:
        items = galleryData.projectPhotos;
        type = 'project';
        break;
      case 2:
        items = galleryData.eventPhotos;
        type = 'event';
        break;
      default:
        items = [];
    }

    return (
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.url}
                alt={item.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {item.title}
                  {item.featured && (
                    <StarIcon sx={{ ml: 1, color: 'gold', fontSize: 16 }} />
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {item.description}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip label={item.category} size="small" sx={{ mr: 1 }} />
                  <Chip label={item.date} size="small" variant="outlined" />
                </Box>
              </CardContent>
              <CardActions>
                <IconButton size="small" onClick={() => handleEdit(item, type)}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(item.id, type)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton size="small" component="a" href={item.url} target="_blank">
                  <ViewIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Gallery Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add New Photo
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label={`Profile Photos (${galleryData.profilePhotos.length})`} />
          <Tab label={`Project Photos (${galleryData.projectPhotos.length})`} />
          <Tab label={`Event Photos (${galleryData.eventPhotos.length})`} />
        </Tabs>
      </Paper>

      {renderGallery()}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingItem ? 'Edit Photo' : 'Add New Photo'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={newItem.url}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newItem.category}
                  label="Category"
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  <MenuItem value="profile">Profile</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="team">Team</MenuItem>
                  <MenuItem value="speaking">Speaking</MenuItem>
                  <MenuItem value="event">Event</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {currentTab === 1 && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project ID"
                  type="number"
                  value={newItem.projectId || ''}
                  onChange={(e) => setNewItem({ ...newItem, projectId: parseInt(e.target.value) })}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newItem.featured}
                    onChange={(e) => setNewItem({ ...newItem, featured: e.target.checked })}
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon />}
                  />
                }
                label="Featured"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GalleryManagement;