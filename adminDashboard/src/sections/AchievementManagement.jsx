import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  Card,
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
  Tabs,
  Tab,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  EmojiEvents as TrophyIcon,
  School as CertIcon,
  TrendingUp as MilestoneIcon,
  Link as LinkIcon,
  CalendarToday as DateIcon,
  Business as IssuerIcon,
  Star as StarIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const AchievementManagement = () => {
  const [achievements, setAchievements] = useState(portfolioData.achievements);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    type: 'award',
    title: '',
    issuer: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    icon: '🏆',
    category: '',
    url: '',
    credentialId: '',
    metric: '',
  });
  const [activeTab, setActiveTab] = useState(0);

  const achievementTypes = [
    { value: 'award', label: 'Awards', icon: TrophyIcon, color: 'gold' },
    { value: 'certification', label: 'Certifications', icon: CertIcon, color: 'blue' },
    { value: 'milestone', label: 'Milestones', icon: MilestoneIcon, color: 'green' }
  ];

  const awardCategories = [
    'Open Source', 'Hackathon', 'Community', 'Design', 'Performance', 'Innovation'
  ];

  const certificationIssuers = [
    'Amazon Web Services', 'Google Cloud', 'Microsoft', 'Meta', 'Oracle',
    'IBM', 'Cisco', 'Scrum Alliance', 'PMI', 'CompTIA', 'Linux Foundation'
  ];

  const handleAddNew = (type = 'award') => {
    setEditingItem(null);
    setNewItem({
      type,
      title: '',
      issuer: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      icon: type === 'award' ? '🏆' : type === 'certification' ? '☁️' : '⭐',
      category: '',
      url: '',
      credentialId: '',
      metric: '',
    });
    setOpenDialog(true);
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, originalType: type });
    setNewItem({ 
      ...item, 
      type: type === 'awards' ? 'award' : 
            type === 'certifications' ? 'certification' : 'milestone' 
    });
    setOpenDialog(true);
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedAchievements = { ...achievements };
      if (type === 'awards') {
        updatedAchievements.awards = updatedAchievements.awards.filter(item => item.id !== id);
      } else if (type === 'certifications') {
        updatedAchievements.certifications = updatedAchievements.certifications.filter(item => item.id !== id);
      } else if (type === 'milestones') {
        updatedAchievements.milestones = updatedAchievements.milestones.filter(item => item.id !== id);
      }
      setAchievements(updatedAchievements);
    }
  };

  const handleSave = () => {
    const itemToSave = {
      ...newItem,
      id: editingItem ? editingItem.id : Date.now()
    };

    const updatedAchievements = { ...achievements };

    if (editingItem) {
      // Remove from old category if type changed
      if (editingItem.originalType !== `${newItem.type}s`) {
        if (editingItem.originalType === 'awards') {
          updatedAchievements.awards = updatedAchievements.awards.filter(item => item.id !== editingItem.id);
        } else if (editingItem.originalType === 'certifications') {
          updatedAchievements.certifications = updatedAchievements.certifications.filter(item => item.id !== editingItem.id);
        } else if (editingItem.originalType === 'milestones') {
          updatedAchievements.milestones = updatedAchievements.milestones.filter(item => item.id !== editingItem.id);
        }
      }
    }

    // Add to new category
    if (newItem.type === 'award') {
      if (editingItem && editingItem.originalType === 'awards') {
        const index = updatedAchievements.awards.findIndex(item => item.id === editingItem.id);
        updatedAchievements.awards[index] = itemToSave;
      } else {
        updatedAchievements.awards.push(itemToSave);
      }
    } else if (newItem.type === 'certification') {
      if (editingItem && editingItem.originalType === 'certifications') {
        const index = updatedAchievements.certifications.findIndex(item => item.id === editingItem.id);
        updatedAchievements.certifications[index] = itemToSave;
      } else {
        updatedAchievements.certifications.push(itemToSave);
      }
    } else if (newItem.type === 'milestone') {
      if (editingItem && editingItem.originalType === 'milestones') {
        const index = updatedAchievements.milestones.findIndex(item => item.id === editingItem.id);
        updatedAchievements.milestones[index] = itemToSave;
      } else {
        updatedAchievements.milestones.push(itemToSave);
      }
    }

    setAchievements(updatedAchievements);
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getItemsByType = (type) => {
    switch(type) {
      case 0: return achievements.awards;
      case 1: return achievements.certifications;
      case 2: return achievements.milestones;
      default: return [];
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 0: return 'awards';
      case 1: return 'certifications';
      case 2: return 'milestones';
      default: return 'awards';
    }
  };

  const renderAchievementCard = (item, type) => {
    const IconComponent = achievementTypes.find(t => t.value === (type === 'awards' ? 'award' : 
                                                               type === 'certifications' ? 'certification' : 'milestone'))?.icon || TrophyIcon;
    
    return (
      <Grid item xs={12} sm={6} md={4} key={item.id}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <IconComponent sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.issuer}
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" paragraph>
              {item.description}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <DateIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="caption">
                {new Date(item.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short',
                  day: 'numeric' 
                })}
              </Typography>
            </Box>

            {item.category && (
              <Chip
                label={item.category}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            )}

            {item.metric && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="h6" color="primary">
                  {item.metric}
                </Typography>
              </Box>
            )}

            {item.credentialId && (
              <Typography variant="caption" color="text.secondary" display="block">
                ID: {item.credentialId}
              </Typography>
            )}
          </CardContent>
          
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <Box>
              <IconButton size="small" onClick={() => handleEdit(item, getTypeLabel(activeTab))}>
                <EditIcon />
              </IconButton>
              <IconButton size="small" onClick={() => handleDelete(item.id, getTypeLabel(activeTab))}>
                <DeleteIcon />
              </IconButton>
            </Box>
            {item.url && (
              <IconButton size="small" component="a" href={item.url} target="_blank">
                <LinkIcon />
              </IconButton>
            )}
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Achievements Management</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<TrophyIcon />}
            onClick={() => handleAddNew('award')}
          >
            Add Award
          </Button>
          <Button
            variant="outlined"
            startIcon={<CertIcon />}
            onClick={() => handleAddNew('certification')}
          >
            Add Certification
          </Button>
          <Button
            variant="outlined"
            startIcon={<MilestoneIcon />}
            onClick={() => handleAddNew('milestone')}
          >
            Add Milestone
          </Button>
        </Box>
      </Box>

      {/* Stats Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {achievementTypes.map((type, index) => (
          <Grid item xs={12} md={4} key={type.value}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <type.icon sx={{ fontSize: 48, color: type.color, mb: 2 }} />
              <Typography variant="h4">
                {getItemsByType(index).length}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {type.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label={`Awards (${achievements.awards.length})`} />
          <Tab label={`Certifications (${achievements.certifications.length})`} />
          <Tab label={`Milestones (${achievements.milestones.length})`} />
        </Tabs>
      </Paper>

      {/* Achievements Grid */}
      <Grid container spacing={3}>
        {getItemsByType(activeTab).map(item => 
          renderAchievementCard(item, getTypeLabel(activeTab))
        )}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {editingItem ? `Edit ${newItem.type}` : `Add New ${newItem.type}`}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Achievement Type</InputLabel>
                <Select
                  value={newItem.type}
                  label="Achievement Type"
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                  disabled={!!editingItem}
                >
                  {achievementTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <type.icon sx={{ mr: 1 }} />
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

            {newItem.type !== 'milestone' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Issuer/Organization"
                  value={newItem.issuer}
                  onChange={(e) => setNewItem({ ...newItem, issuer: e.target.value })}
                  required={newItem.type !== 'milestone'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IssuerIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            )}

            {newItem.type === 'award' && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={newItem.category || ''}
                    label="Category"
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  >
                    <MenuItem value="">None</MenuItem>
                    {awardCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {newItem.type === 'certification' && (
              <>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Issuer</InputLabel>
                    <Select
                      value={newItem.issuer || ''}
                      label="Issuer"
                      onChange={(e) => setNewItem({ ...newItem, issuer: e.target.value })}
                    >
                      <MenuItem value="">Select or type custom</MenuItem>
                      {certificationIssuers.map((issuer) => (
                        <MenuItem key={issuer} value={issuer}>
                          {issuer}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Credential ID"
                    value={newItem.credentialId || ''}
                    onChange={(e) => setNewItem({ ...newItem, credentialId: e.target.value })}
                    placeholder="e.g., AWS-789123"
                  />
                </Grid>
              </>
            )}

            {newItem.type === 'milestone' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Metric"
                    value={newItem.metric || ''}
                    onChange={(e) => setNewItem({ ...newItem, metric: e.target.value })}
                    placeholder="e.g., 10,000+"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Icon"
                    value={newItem.icon || ''}
                    onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                    placeholder="e.g., ⭐"
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                required
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
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Verification URL"
                value={newItem.url || ''}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                placeholder="e.g., https://credly.com/badges/..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Icon"
                value={newItem.icon || ''}
                onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                placeholder="Choose an emoji or icon"
                helperText="Use an emoji or icon to represent this achievement"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={!newItem.title || !newItem.description}>
            {editingItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AchievementManagement;