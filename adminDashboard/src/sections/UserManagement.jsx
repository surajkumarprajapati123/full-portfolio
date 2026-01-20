// UserManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  Avatar,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardActions,
  Fade,
  Slide,
  Grow,
  Zoom,
  Container,
  Stack,
  Divider,
  Tooltip,
  Badge,
  Tabs,
  Tab,
  InputAdornment,
  Alert,
  Snackbar,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  LinearProgress,
  Rating,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Palette as DribbbleIcon,
  Code as CodepenIcon,
  Article as MediumIcon,
  QuestionAnswer as StackoverflowIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  CalendarMonth as CalendlyIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Description as BioIcon,
  Link as LinkIcon,
  Share as ShareIcon,
  CloudUpload as UploadIcon,
  PhotoCamera as CameraIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon,
  Verified as VerifiedIcon,
  Favorite as FavoriteIcon,
  Visibility as ViewIcon,
  Settings as SettingsIcon,
  QrCode as QrIcon,
  School as SchoolIcon,
  WorkHistory as WorkHistoryIcon,
  Language as LanguageIcon,
  Build as BuildIcon,
  Interests as InterestsIcon,
  Psychology as PsychologyIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  EditNote as EditNoteIcon,
  DateRange as DateRangeIcon,
  Grade as GradeIcon,
  Timeline as TimelineIcon,
  CorporateFare as CompanyIcon,
  Subject as SubjectIcon,
  CalendarToday as CalendarIcon,
  Percent as PercentIcon,
  Security as SecurityIcon,
  LocalLibrary as LibraryIcon,
  MenuBook as BookIcon,
  Code as CodeIcon,
  DesignServices as DesignIcon,
  BusinessCenter as BusinessIcon,
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import axios from 'axios';

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// API base URL
const API_BASE_URL =  'http://localhost:5000/api';

const UserManagement = () => {
  const theme = useTheme();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [avatarHover, setAvatarHover] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skillsDialog, setSkillsDialog] = useState(false);
  const [educationDialog, setEducationDialog] = useState(false);
  const [languagesDialog, setLanguagesDialog] = useState(false);
  const [preferencesDialog, setPreferencesDialog] = useState(false);
  const [socialDialog, setSocialDialog] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 3, category: 'technical' });
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', field: '', startYear: '', endYear: '', current: false });
  const [newLanguage, setNewLanguage] = useState({ language: '', proficiency: 'intermediate' });
  const [skillCategories] = useState(['technical', 'design', 'business', 'soft']);
  const [proficiencyLevels] = useState(['beginner', 'intermediate', 'advanced', 'expert']);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const userWithRelatedData = {
        ...response.data,
        skills: response.data.skills || [],
        education: response.data.education || [],
        languages: response.data.languages || [],
        preferences: response.data.preferences || {},
        social: response.data.social || {}
      };
      
      setUserData(userWithRelatedData);
      setTempData({ ...userWithRelatedData });
      setAvatarPreview(userWithRelatedData.avatar);
    } catch (error) {
      console.error('Error fetching user data:', error);
      showSnackbar('Failed to load user data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setTempData({ ...userData });
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/users/profile`, tempData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserData(tempData);
      setEditMode(false);
      showSnackbar('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showSnackbar('Failed to update profile', 'error');
    }
  };

  const handleCancel = () => {
    setTempData({ ...userData });
    setEditMode(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value,
    });
  };

  const handleNestedChange = (section, field, value) => {
    setTempData({
      ...tempData,
      [section]: {
        ...tempData[section],
        [field]: value,
      },
    });
  };

  const handleArrayChange = (section, field, value) => {
    setTempData({
      ...tempData,
      [section]: {
        ...tempData[section],
        [field]: value.split(',').map(item => item.trim()),
      },
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setTempData({
          ...tempData,
          avatar: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Skills Management
  const addSkill = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/skills`, newSkill, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserData(prev => ({
        ...prev,
        skills: [...prev.skills, response.data]
      }));
      setTempData(prev => ({
        ...prev,
        skills: [...prev.skills, response.data]
      }));
      setNewSkill({ name: '', level: 3, category: 'technical' });
      setSkillsDialog(false);
      showSnackbar('Skill added successfully', 'success');
    } catch (error) {
      showSnackbar('Failed to add skill', 'error');
    }
  };

  const removeSkill = async (skillId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/skills/${skillId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserData(prev => ({
        ...prev,
        skills: prev.skills.filter(skill => skill._id !== skillId)
      }));
      setTempData(prev => ({
        ...prev,
        skills: prev.skills.filter(skill => skill._id !== skillId)
      }));
      showSnackbar('Skill removed', 'success');
    } catch (error) {
      showSnackbar('Failed to remove skill', 'error');
    }
  };

  // Education Management
  const addEducation = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/education`, newEducation, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserData(prev => ({
        ...prev,
        education: [...prev.education, response.data]
      }));
      setTempData(prev => ({
        ...prev,
        education: [...prev.education, response.data]
      }));
      setNewEducation({ institution: '', degree: '', field: '', startYear: '', endYear: '', current: false });
      setEducationDialog(false);
      showSnackbar('Education added successfully', 'success');
    } catch (error) {
      showSnackbar('Failed to add education', 'error');
    }
  };

  const removeEducation = async (educationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/education/${educationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserData(prev => ({
        ...prev,
        education: prev.education.filter(edu => edu._id !== educationId)
      }));
      setTempData(prev => ({
        ...prev,
        education: prev.education.filter(edu => edu._id !== educationId)
      }));
      showSnackbar('Education removed', 'success');
    } catch (error) {
      showSnackbar('Failed to remove education', 'error');
    }
  };

  // Languages Management
  const addLanguage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/languages`, newLanguage, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserData(prev => ({
        ...prev,
        languages: [...prev.languages, response.data]
      }));
      setTempData(prev => ({
        ...prev,
        languages: [...prev.languages, response.data]
      }));
      setNewLanguage({ language: '', proficiency: 'intermediate' });
      setLanguagesDialog(false);
      showSnackbar('Language added successfully', 'success');
    } catch (error) {
      showSnackbar('Failed to add language', 'error');
    }
  };

  const removeLanguage = async (languageId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/languages/${languageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserData(prev => ({
        ...prev,
        languages: prev.languages.filter(lang => lang._id !== languageId)
      }));
      setTempData(prev => ({
        ...prev,
        languages: prev.languages.filter(lang => lang._id !== languageId)
      }));
      showSnackbar('Language removed', 'success');
    } catch (error) {
      showSnackbar('Failed to remove language', 'error');
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'technical': return <CodeIcon />;
      case 'design': return <DesignIcon />;
      case 'business': return <BusinessIcon />;
      case 'soft': return <PsychologyIcon />;
      default: return <BuildIcon />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'technical': return theme.palette.primary.main;
      case 'design': return theme.palette.secondary.main;
      case 'business': return theme.palette.success.main;
      case 'soft': return theme.palette.warning.main;
      default: return theme.palette.info.main;
    }
  };

  if (loading || !userData) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Grow in={true} timeout={800}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 3,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            boxShadow: 3,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <Box>
              <Typography variant="h3" sx={{ 
                fontWeight: 800,
                mb: 1,
                background: 'linear-gradient(90deg, #fff, #f0f0f0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${shimmerAnimation} 3s ease-in-out infinite`,
                backgroundSize: '200% auto',
              }}>
                Professional Dashboard
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage your complete professional profile
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={editMode ? <SaveIcon /> : <EditIcon />}
              onClick={editMode ? handleSave : handleEdit}
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'scale(1.05)',
                },
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: 4,
              }}
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </Box>
        </Grow>
      </Box>

      {/* Profile Completion Progress */}
      <Slide direction="up" in={true} timeout={600}>
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Profile Completion
            </Typography>
            <Typography variant="h4" color="primary">
              {userData.profileCompletion}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={userData.profileCompletion} 
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Complete your profile to increase visibility
          </Typography>
        </Paper>
      </Slide>

      {/* Avatar Section */}
      <Slide direction="up" in={true} timeout={600}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                editMode ? (
                  <Tooltip title="Change Avatar">
                    <IconButton
                      component="label"
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': { bgcolor: theme.palette.primary.dark }
                      }}
                    >
                      <CameraIcon />
                      <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                    </IconButton>
                  </Tooltip>
                ) : null
              }
            >
              <Avatar
                src={editMode ? avatarPreview : userData.avatar}
                sx={{
                  width: 150,
                  height: 150,
                  border: `4px solid ${theme.palette.primary.main}`,
                  boxShadow: 6,
                }}
              />
            </Badge>
          </Box>
        </Box>
      </Slide>

      {/* Tabs for Different Sections */}
      <Paper sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            '& .MuiTab-root': {
              py: 2,
              minWidth: 120,
              fontSize: '0.9rem',
              fontWeight: 600,
              '&.Mui-selected': { color: theme.palette.primary.main }
            },
          }}
        >
          <Tab icon={<PersonIcon />} label="Basic Info" />
          <Tab icon={<BuildIcon />} label="Skills" />
          <Tab icon={<SchoolIcon />} label="Education" />
          <Tab icon={<LanguageIcon />} label="Languages" />
          <Tab icon={<InterestsIcon />} label="Expertise" />
          <Tab icon={<ShareIcon />} label="Social" />
          <Tab icon={<SettingsIcon />} label="Preferences" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Basic Info Tab */}
          {activeTab === 0 && (
            <Fade in={activeTab === 0} timeout={500}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={editMode ? tempData.name : userData.name}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputProps={{ startAdornment: <PersonIcon color="primary" /> }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Professional Title"
                    name="title"
                    value={editMode ? tempData.title : userData.title}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputProps={{ startAdornment: <WorkIcon color="primary" /> }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    multiline
                    rows={4}
                    value={editMode ? tempData.bio : userData.bio}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputProps={{ startAdornment: <BioIcon color="primary" sx={{ mt: 1 }} /> }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={editMode ? tempData.email : userData.email}
                    onChange={handleChange}
                    disabled
                    InputProps={{ startAdornment: <EmailIcon color="primary" /> }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={editMode ? tempData.location : userData.location}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputProps={{ startAdornment: <LocationIcon color="primary" /> }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="About Description"
                    name="about.description"
                    multiline
                    rows={3}
                    value={editMode ? tempData.about?.description || '' : userData.about?.description || ''}
                    onChange={(e) => handleNestedChange('about', 'description', e.target.value)}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Availability Status"
                    name="availability"
                    value={editMode ? tempData.availability : userData.availability}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Grid>
              </Grid>
            </Fade>
          )}

          {/* Skills Tab */}
          {activeTab === 1 && (
            <Fade in={activeTab === 1} timeout={500}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Technical & Professional Skills</Typography>
                  {editMode && (
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      onClick={() => setSkillsDialog(true)}
                    >
                      Add Skill
                    </Button>
                  )}
                </Box>

                <Grid container spacing={2}>
                  {userData.skills.map((skill) => (
                    <Grid item xs={12} sm={6} md={4} key={skill._id}>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {getCategoryIcon(skill.category)}
                              <Typography variant="h6" sx={{ ml: 1 }}>
                                {skill.name}
                              </Typography>
                            </Box>
                            {editMode && (
                              <IconButton size="small" onClick={() => removeSkill(skill._id)}>
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                              Level:
                            </Typography>
                            <Rating value={skill.level} max={5} readOnly size="small" />
                          </Box>
                          <Chip
                            label={skill.category}
                            size="small"
                            sx={{
                              bgcolor: alpha(getCategoryColor(skill.category), 0.1),
                              color: getCategoryColor(skill.category),
                              textTransform: 'capitalize'
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          )}

          {/* Education Tab */}
          {activeTab === 2 && (
            <Fade in={activeTab === 2} timeout={500}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Education History</Typography>
                  {editMode && (
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      onClick={() => setEducationDialog(true)}
                    >
                      Add Education
                    </Button>
                  )}
                </Box>

                <Stack spacing={3}>
                  {userData.education.map((edu) => (
                    <Paper key={edu._id} sx={{ p: 3, position: 'relative' }}>
                      {editMode && (
                        <IconButton 
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                          onClick={() => removeEducation(edu._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                          <Typography variant="h6">{edu.institution}</Typography>
                          <Typography variant="subtitle1" color="primary">
                            {edu.degree} in {edu.field}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <DateRangeIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                              {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Fade>
          )}

          {/* Languages Tab */}
          {activeTab === 3 && (
            <Fade in={activeTab === 3} timeout={500}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Languages</Typography>
                  {editMode && (
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      onClick={() => setLanguagesDialog(true)}
                    >
                      Add Language
                    </Button>
                  )}
                </Box>

                <Grid container spacing={2}>
                  {userData.languages.map((lang) => (
                    <Grid item xs={12} sm={6} md={4} key={lang._id}>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">{lang.language}</Typography>
                            {editMode && (
                              <IconButton size="small" onClick={() => removeLanguage(lang._id)}>
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </Box>
                          <Chip
                            label={lang.proficiency}
                            size="small"
                            sx={{
                              mt: 1,
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              textTransform: 'capitalize'
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          )}

          {/* Expertise Tab */}
          {activeTab === 4 && (
            <Fade in={activeTab === 4} timeout={500}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Specializations
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={tempData.expertise?.specializations?.join(', ') || ''}
                        onChange={(e) => handleArrayChange('expertise', 'specializations', e.target.value)}
                        placeholder="Enter specializations separated by commas"
                      />
                    ) : (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {userData.expertise?.specializations?.map((spec, index) => (
                          <Chip key={index} label={spec} />
                        ))}
                      </Box>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Methodologies
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={tempData.expertise?.methodologies?.join(', ') || ''}
                        onChange={(e) => handleArrayChange('expertise', 'methodologies', e.target.value)}
                        placeholder="Enter methodologies separated by commas"
                      />
                    ) : (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {userData.expertise?.methodologies?.map((method, index) => (
                          <Chip key={index} label={method} color="primary" variant="outlined" />
                        ))}
                      </Box>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Soft Skills
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={tempData.expertise?.softSkills?.join(', ') || ''}
                        onChange={(e) => handleArrayChange('expertise', 'softSkills', e.target.value)}
                        placeholder="Enter soft skills separated by commas"
                      />
                    ) : (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {userData.expertise?.softSkills?.map((skill, index) => (
                          <Chip key={index} label={skill} color="secondary" />
                        ))}
                      </Box>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Interests
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={tempData.interests?.[0]?.items?.join(', ') || ''}
                        onChange={(e) => {
                          setTempData({
                            ...tempData,
                            interests: [{
                              category: 'General',
                              items: e.target.value.split(',').map(item => item.trim())
                            }]
                          });
                        }}
                        placeholder="Enter interests separated by commas"
                      />
                    ) : (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {userData.interests?.[0]?.items?.map((interest, index) => (
                          <Chip key={index} label={interest} color="default" variant="outlined" />
                        ))}
                      </Box>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </Fade>
          )}

          {/* Social Tab */}
          {activeTab === 5 && (
            <Fade in={activeTab === 5} timeout={500}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>GitHub</Typography>
                    <TextField
                      fullWidth
                      value={editMode ? tempData.social?.github || '' : userData.social?.github || ''}
                      onChange={(e) => handleNestedChange('social', 'github', e.target.value)}
                      disabled={!editMode}
                      placeholder="https://github.com/username"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>LinkedIn</Typography>
                    <TextField
                      fullWidth
                      value={editMode ? tempData.social?.linkedin || '' : userData.social?.linkedin || ''}
                      onChange={(e) => handleNestedChange('social', 'linkedin', e.target.value)}
                      disabled={!editMode}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>Twitter</Typography>
                    <TextField
                      fullWidth
                      value={editMode ? tempData.social?.twitter || '' : userData.social?.twitter || ''}
                      onChange={(e) => handleNestedChange('social', 'twitter', e.target.value)}
                      disabled={!editMode}
                      placeholder="https://twitter.com/username"
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Fade>
          )}

          {/* Preferences Tab */}
          {activeTab === 6 && (
            <Fade in={activeTab === 6} timeout={500}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>Work Preferences</Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={editMode ? tempData.preferences?.remoteWork : userData.preferences?.remoteWork || false}
                          onChange={(e) => handleNestedChange('preferences', 'remoteWork', e.target.checked)}
                          disabled={!editMode}
                        />
                      }
                      label="Open to Remote Work"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={editMode ? tempData.preferences?.freelance : userData.preferences?.freelance || false}
                          onChange={(e) => handleNestedChange('preferences', 'freelance', e.target.checked)}
                          disabled={!editMode}
                        />
                      }
                      label="Available for Freelance"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>Profile Visibility</Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={editMode ? tempData.preferences?.publicProfile : userData.preferences?.publicProfile || true}
                          onChange={(e) => handleNestedChange('preferences', 'publicProfile', e.target.checked)}
                          disabled={!editMode}
                        />
                      }
                      label="Public Profile"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={editMode ? tempData.preferences?.showContact : userData.preferences?.showContact || true}
                          onChange={(e) => handleNestedChange('preferences', 'showContact', e.target.checked)}
                          disabled={!editMode}
                        />
                      }
                      label="Show Contact Information"
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Fade>
          )}
        </Box>
      </Paper>

      {/* Contact Information */}
      <Slide direction="up" in={true} timeout={800}>
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>Contact Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Phone"
                value={editMode ? tempData.contact?.phone || '' : userData.contact?.phone || ''}
                onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)}
                disabled={!editMode}
                InputProps={{ startAdornment: <PhoneIcon /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Website"
                value={editMode ? tempData.contact?.website || '' : userData.contact?.website || ''}
                onChange={(e) => handleNestedChange('contact', 'website', e.target.value)}
                disabled={!editMode}
                InputProps={{ startAdornment: <WebsiteIcon /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Calendly"
                value={editMode ? tempData.contact?.calendly || '' : userData.contact?.calendly || ''}
                onChange={(e) => handleNestedChange('contact', 'calendly', e.target.value)}
                disabled={!editMode}
                InputProps={{ startAdornment: <CalendlyIcon /> }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Slide>

      {/* Action Buttons */}
      {editMode && (
        <Zoom in={editMode} timeout={300}>
          <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                size="large"
                sx={{ px: 4, py: 1.5, borderRadius: 2 }}
              >
                Discard Changes
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                }}
              >
                Save All Changes
              </Button>
            </Box>
          </Paper>
        </Zoom>
      )}

      {/* Dialogs for Adding Items */}
      <Dialog open={skillsDialog} onClose={() => setSkillsDialog(false)}>
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                label="Category"
              >
                {skillCategories.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <Typography gutterBottom>Skill Level</Typography>
              <Rating
                value={newSkill.level}
                onChange={(e, newValue) => setNewSkill({ ...newSkill, level: newValue })}
                max={5}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSkillsDialog(false)}>Cancel</Button>
          <Button onClick={addSkill} variant="contained">Add Skill</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={educationDialog} onClose={() => setEducationDialog(false)}>
        <DialogTitle>Add Education</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Institution"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
              fullWidth
            />
            <TextField
              label="Degree"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              fullWidth
            />
            <TextField
              label="Field of Study"
              value={newEducation.field}
              onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Start Year"
                value={newEducation.startYear}
                onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
                fullWidth
              />
              <TextField
                label="End Year"
                value={newEducation.endYear}
                onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
                disabled={newEducation.current}
                fullWidth
              />
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newEducation.current}
                  onChange={(e) => setNewEducation({ ...newEducation, current: e.target.checked })}
                />
              }
              label="Currently studying here"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEducationDialog(false)}>Cancel</Button>
          <Button onClick={addEducation} variant="contained">Add Education</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={languagesDialog} onClose={() => setLanguagesDialog(false)}>
        <DialogTitle>Add Language</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Language"
              value={newLanguage.language}
              onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Proficiency</InputLabel>
              <Select
                value={newLanguage.proficiency}
                onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
                label="Proficiency"
              >
                {proficiencyLevels.map(level => (
                  <MenuItem key={level} value={level}>{level}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLanguagesDialog(false)}>Cancel</Button>
          <Button onClick={addLanguage} variant="contained">Add Language</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserManagement;