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
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Groups as CommunityIcon,
  Code as OpenSourceIcon,
  EmojiEvents as HackathonIcon,
  Mic as SpeakingIcon,
  Article as PublicationIcon,
  GitHub as GitHubIcon,
  Link as LinkIcon,
  CalendarToday as DateIcon,
  People as PeopleIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const ExtracurricularManagement = () => {
  const [extracurricular, setExtracurricular] = useState(portfolioData.extracurricular);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    type: 'openSource',
    project: '',
    role: '',
    description: '',
    githubUrl: '',
    stars: '',
    contributors: '',
    status: 'Active',
    technologies: [],
    organization: '',
    period: '',
    activities: [''],
    link: '',
    name: '',
    date: new Date().toISOString().split('T')[0],
    achievement: '',
    event: '',
    title: '',
    location: '',
    typeOfEvent: '',
    audienceSize: '',
    recordingUrl: '',
    slidesUrl: '',
    publisher: '',
    readTime: '',
    category: '',
  });
  const [activeTab, setActiveTab] = useState(0);
  const [newActivity, setNewActivity] = useState('');

  const activityTypes = [
    { value: 'openSource', label: 'Open Source', icon: OpenSourceIcon, color: '#28a745' },
    { value: 'community', label: 'Community', icon: CommunityIcon, color: '#007bff' },
    { value: 'hackathons', label: 'Hackathons', icon: HackathonIcon, color: '#ffc107' },
    { value: 'speaking', label: 'Speaking', icon: SpeakingIcon, color: '#dc3545' },
    { value: 'publications', label: 'Publications', icon: PublicationIcon, color: '#6f42c1' }
  ];

  const technologyOptions = [
    'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript',
    'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift',
    'Kotlin', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP'
  ];

  const handleAddNew = (type = 'openSource') => {
    setEditingItem(null);
    setNewItem({
      type,
      project: '',
      role: '',
      description: '',
      githubUrl: '',
      stars: '',
      contributors: '',
      status: 'Active',
      technologies: [],
      organization: '',
      period: '',
      activities: [''],
      link: '',
      name: '',
      date: new Date().toISOString().split('T')[0],
      achievement: '',
      event: '',
      title: '',
      location: '',
      typeOfEvent: '',
      audienceSize: '',
      recordingUrl: '',
      slidesUrl: '',
      publisher: '',
      readTime: '',
      category: '',
    });
    setNewActivity('');
    setOpenDialog(true);
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, originalType: type });
    setNewItem({ 
      ...item, 
      type: type === 'openSource' ? 'openSource' :
            type === 'community' ? 'community' :
            type === 'hackathons' ? 'hackathons' :
            type === 'speaking' ? 'speaking' : 'publications'
    });
    setOpenDialog(true);
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedData = { ...extracurricular };
      if (type === 'openSource') {
        updatedData.openSource = updatedData.openSource.filter(item => item.id !== id);
      } else if (type === 'community') {
        updatedData.community = updatedData.community.filter(item => item.id !== id);
      } else if (type === 'hackathons') {
        updatedData.hackathons = updatedData.hackathons.filter(item => item.id !== id);
      } else if (type === 'speaking') {
        updatedData.speaking = updatedData.speaking.filter(item => item.id !== id);
      } else if (type === 'publications') {
        updatedData.publications = updatedData.publications.filter(item => item.id !== id);
      }
      setExtracurricular(updatedData);
    }
  };

  const handleSave = () => {
    const itemToSave = {
      ...newItem,
      id: editingItem ? editingItem.id : Date.now(),
      activities: Array.isArray(newItem.activities) 
        ? newItem.activities.filter(act => act.trim() !== '')
        : []
    };

    const updatedData = { ...extracurricular };

    if (editingItem) {
      // Remove from old category if type changed
      if (editingItem.originalType !== newItem.type + (newItem.type === 'openSource' ? '' : 's')) {
        const oldType = editingItem.originalType;
        if (oldType === 'openSource') {
          updatedData.openSource = updatedData.openSource.filter(item => item.id !== editingItem.id);
        } else if (oldType === 'community') {
          updatedData.community = updatedData.community.filter(item => item.id !== editingItem.id);
        } else if (oldType === 'hackathons') {
          updatedData.hackathons = updatedData.hackathons.filter(item => item.id !== editingItem.id);
        } else if (oldType === 'speaking') {
          updatedData.speaking = updatedData.speaking.filter(item => item.id !== editingItem.id);
        } else if (oldType === 'publications') {
          updatedData.publications = updatedData.publicities.filter(item => item.id !== editingItem.id);
        }
      }
    }

    // Add to new category
    if (newItem.type === 'openSource') {
      if (editingItem && editingItem.originalType === 'openSource') {
        const index = updatedData.openSource.findIndex(item => item.id === editingItem.id);
        updatedData.openSource[index] = itemToSave;
      } else {
        updatedData.openSource.push(itemToSave);
      }
    } else if (newItem.type === 'community') {
      if (editingItem && editingItem.originalType === 'community') {
        const index = updatedData.community.findIndex(item => item.id === editingItem.id);
        updatedData.community[index] = itemToSave;
      } else {
        updatedData.community.push(itemToSave);
      }
    } else if (newItem.type === 'hackathons') {
      if (editingItem && editingItem.originalType === 'hackathons') {
        const index = updatedData.hackathons.findIndex(item => item.id === editingItem.id);
        updatedData.hackathons[index] = itemToSave;
      } else {
        updatedData.hackathons.push(itemToSave);
      }
    } else if (newItem.type === 'speaking') {
      if (editingItem && editingItem.originalType === 'speaking') {
        const index = updatedData.speaking.findIndex(item => item.id === editingItem.id);
        updatedData.speaking[index] = itemToSave;
      } else {
        updatedData.speaking.push(itemToSave);
      }
    } else if (newItem.type === 'publications') {
      if (editingItem && editingItem.originalType === 'publications') {
        const index = updatedData.publications.findIndex(item => item.id === editingItem.id);
        updatedData.publications[index] = itemToSave;
      } else {
        updatedData.publications.push(itemToSave);
      }
    }

    setExtracurricular(updatedData);
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setNewItem({
        ...newItem,
        activities: [...(newItem.activities || []), newActivity.trim()]
      });
      setNewActivity('');
    }
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = [...(newItem.activities || [])];
    updatedActivities.splice(index, 1);
    setNewItem({
      ...newItem,
      activities: updatedActivities
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getItemsByType = (type) => {
    switch(type) {
      case 0: return extracurricular.openSource;
      case 1: return extracurricular.community;
      case 2: return extracurricular.hackathons;
      case 3: return extracurricular.speaking;
      case 4: return extracurricular.publications;
      default: return [];
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 0: return 'openSource';
      case 1: return 'community';
      case 2: return 'hackathons';
      case 3: return 'speaking';
      case 4: return 'publications';
      default: return 'openSource';
    }
  };

  const renderActivityCard = (item, type) => {
    const IconComponent = activityTypes.find(t => t.value === type)?.icon || CommunityIcon;
    
    return (
      <Grid item xs={12} md={6} key={item.id}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconComponent sx={{ fontSize: 32, color: activityTypes.find(t => t.value === type)?.color, mr: 2 }} />
              <Box>
                <Typography variant="h6">
                  {item.project || item.organization || item.name || item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.role || item.event || item.publisher}
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" paragraph>
              {item.description}
            </Typography>

            {type === 'openSource' && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <Chip
                    icon={<StarIcon />}
                    label={`${item.stars} stars`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    icon={<PeopleIcon />}
                    label={`${item.contributors} contributors`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={item.status}
                    size="small"
                    color={item.status === 'Active' ? 'success' : 'default'}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {item.technologies?.map((tech, idx) => (
                    <Chip key={idx} label={tech} size="small" />
                  ))}
                </Box>
              </Box>
            )}

            {type === 'community' && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Period: {item.period}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {item.activities?.map((activity, idx) => (
                    <Chip key={idx} label={activity} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}

            {type === 'hackathons' && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip
                    label={item.date}
                    size="small"
                    icon={<DateIcon />}
                  />
                  <Chip
                    label={item.achievement}
                    size="small"
                    color="success"
                  />
                </Box>
                <Typography variant="subtitle2" gutterBottom>
                  Technologies Used:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {item.technologies?.map((tech, idx) => (
                    <Chip key={idx} label={tech} size="small" />
                  ))}
                </Box>
              </Box>
            )}

            {type === 'speaking' && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip
                    label={item.event}
                    size="small"
                  />
                  <Chip
                    label={item.typeOfEvent}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`${item.audienceSize} attendees`}
                    size="small"
                    icon={<PeopleIcon />}
                  />
                </Box>
                <Typography variant="body2">
                  {item.location} • {new Date(item.date).toLocaleDateString()}
                </Typography>
              </Box>
            )}

            {type === 'publications' && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip
                    label={item.category}
                    size="small"
                  />
                  <Chip
                    label={item.readTime}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body2">
                  Published: {new Date(item.date).toLocaleDateString()}
                </Typography>
              </Box>
            )}
          </CardContent>
          
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <Box>
              <IconButton size="small" onClick={() => handleEdit(item, type)}>
                <EditIcon />
              </IconButton>
              <IconButton size="small" onClick={() => handleDelete(item.id, type)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <Box>
              {(item.githubUrl || item.link || item.recordingUrl || item.url) && (
                <IconButton 
                  size="small" 
                  component="a" 
                  href={item.githubUrl || item.link || item.recordingUrl || item.url} 
                  target="_blank"
                >
                  {item.githubUrl ? <GitHubIcon /> : <LinkIcon />}
                </IconButton>
              )}
            </Box>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Extracurricular Activities Management</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {activityTypes.map((type) => (
            <Button
              key={type.value}
              variant="outlined"
              startIcon={<type.icon />}
              onClick={() => handleAddNew(type.value)}
              size="small"
            >
              Add {type.label}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Stats Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {activityTypes.map((type, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={type.value}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <type.icon sx={{ fontSize: 32, color: type.color, mb: 1 }} />
              <Typography variant="h5">
                {getItemsByType(index).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {type.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          {activityTypes.map((type, index) => (
            <Tab 
              key={type.value} 
              label={`${type.label} (${getItemsByType(index).length})`} 
              icon={<type.icon />}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Paper>

      {/* Activities Grid */}
      <Grid container spacing={3}>
        {getItemsByType(activeTab).map(item => 
          renderActivityCard(item, getTypeLabel(activeTab))
        )}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { maxHeight: '90vh' } }}
      >
        <DialogTitle>
          {editingItem ? `Edit ${activityTypes.find(t => t.value === newItem.type)?.label}` : 
                         `Add New ${activityTypes.find(t => t.value === newItem.type)?.label}`}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Activity Type</InputLabel>
                <Select
                  value={newItem.type}
                  label="Activity Type"
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                  disabled={!!editingItem}
                >
                  {activityTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <type.icon sx={{ mr: 1 }} />
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Common Fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={newItem.type === 'openSource' ? 'Project Name' : 
                       newItem.type === 'community' ? 'Organization' :
                       newItem.type === 'hackathons' ? 'Hackathon Name' :
                       newItem.type === 'speaking' ? 'Event' :
                       'Title'}
                value={newItem.project || newItem.organization || newItem.name || newItem.title || newItem.event || ''}
                onChange={(e) => {
                  const fieldName = newItem.type === 'openSource' ? 'project' :
                                   newItem.type === 'community' ? 'organization' :
                                   newItem.type === 'hackathons' ? 'name' :
                                   newItem.type === 'speaking' ? 'event' : 'title';
                  setNewItem({ ...newItem, [fieldName]: e.target.value });
                }}
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
                required
              />
            </Grid>

            {/* Type-specific Fields */}
            {newItem.type === 'openSource' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Your Role"
                    value={newItem.role || ''}
                    onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
                    placeholder="e.g., Maintainer & Core Contributor"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={newItem.status || 'Active'}
                      label="Status"
                      onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Archived">Archived</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="GitHub Stars"
                    value={newItem.stars || ''}
                    onChange={(e) => setNewItem({ ...newItem, stars: e.target.value })}
                    placeholder="e.g., 2,500+"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contributors"
                    value={newItem.contributors || ''}
                    onChange={(e) => setNewItem({ ...newItem, contributors: e.target.value })}
                    placeholder="e.g., 15"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="GitHub Repository URL"
                    value={newItem.githubUrl || ''}
                    onChange={(e) => setNewItem({ ...newItem, githubUrl: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GitHubIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={technologyOptions}
                    value={newItem.technologies || []}
                    onChange={(event, newValue) => {
                      setNewItem({ ...newItem, technologies: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Technologies Used" placeholder="Add technology" />
                    )}
                  />
                </Grid>
              </>
            )}

            {newItem.type === 'community' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Your Role"
                    value={newItem.role || ''}
                    onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
                    placeholder="e.g., Organizer & Speaker"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Period"
                    value={newItem.period || ''}
                    onChange={(e) => setNewItem({ ...newItem, period: e.target.value })}
                    placeholder="e.g., 2021 - Present"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Activities
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {newItem.activities?.map((activity, index) => (
                      <Chip
                        key={index}
                        label={activity}
                        onDelete={() => handleRemoveActivity(index)}
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Add Activity"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddActivity()}
                    />
                    <Button onClick={handleAddActivity}>Add</Button>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Organization URL"
                    value={newItem.link || ''}
                    onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                  />
                </Grid>
              </>
            )}

            {newItem.type === 'hackathons' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Your Role"
                    value={newItem.role || ''}
                    onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
                    placeholder="e.g., Team Lead & Developer"
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
                  <TextField
                    fullWidth
                    label="Achievement"
                    value={newItem.achievement || ''}
                    onChange={(e) => setNewItem({ ...newItem, achievement: e.target.value })}
                    placeholder="e.g., 1st Place - FinTech Category"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Project Name"
                    value={newItem.project || ''}
                    onChange={(e) => setNewItem({ ...newItem, project: e.target.value })}
                    placeholder="e.g., AI-Powered Investment Assistant"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={technologyOptions}
                    value={newItem.technologies || []}
                    onChange={(event, newValue) => {
                      setNewItem({ ...newItem, technologies: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Technologies Used" placeholder="Add technology" />
                    )}
                  />
                </Grid>
              </>
            )}

            {newItem.type === 'speaking' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Talk Title"
                    value={newItem.title || ''}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
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
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={newItem.location || ''}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                    placeholder="e.g., San Francisco, CA"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Type of Event"
                    value={newItem.typeOfEvent || ''}
                    onChange={(e) => setNewItem({ ...newItem, typeOfEvent: e.target.value })}
                    placeholder="e.g., Conference Talk"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Audience Size"
                    value={newItem.audienceSize || ''}
                    onChange={(e) => setNewItem({ ...newItem, audienceSize: e.target.value })}
                    placeholder="e.g., 500+"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Recording URL"
                    value={newItem.recordingUrl || ''}
                    onChange={(e) => setNewItem({ ...newItem, recordingUrl: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Slides URL"
                    value={newItem.slidesUrl || ''}
                    onChange={(e) => setNewItem({ ...newItem, slidesUrl: e.target.value })}
                  />
                </Grid>
              </>
            )}

            {newItem.type === 'publications' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Publisher"
                    value={newItem.publisher || ''}
                    onChange={(e) => setNewItem({ ...newItem, publisher: e.target.value })}
                    placeholder="e.g., Smashing Magazine"
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
                  <TextField
                    fullWidth
                    label="Read Time"
                    value={newItem.readTime || ''}
                    onChange={(e) => setNewItem({ ...newItem, readTime: e.target.value })}
                    placeholder="e.g., 15 min"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Category"
                    value={newItem.category || ''}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    placeholder="e.g., Technical Article"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Article URL"
                    value={newItem.url || ''}
                    onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                  />
                </Grid>
              </>
            )}

            {/* Date Field for all except publications */}
            {newItem.type !== 'publications' && newItem.type !== 'speaking' && newItem.type !== 'hackathons' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={newItem.date}
                  onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            )}

            {/* URL Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL"
                value={newItem.githubUrl || newItem.link || newItem.recordingUrl || newItem.url || ''}
                onChange={(e) => {
                  const fieldName = newItem.type === 'openSource' ? 'githubUrl' :
                                   newItem.type === 'community' ? 'link' :
                                   newItem.type === 'speaking' ? 'recordingUrl' : 'url';
                  setNewItem({ ...newItem, [fieldName]: e.target.value });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={!newItem.description}>
            {editingItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExtracurricularManagement;