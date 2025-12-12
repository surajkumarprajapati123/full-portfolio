// UserManagement.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { portfolioData } from '../../portfolioData';

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

const socialIcons = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  twitter: <TwitterIcon />,
  dribbble: <DribbbleIcon />,
  codepen: <CodepenIcon />,
  medium: <MediumIcon />,
  stackoverflow: <StackoverflowIcon />,
};

const contactIcons = {
  phone: <PhoneIcon />,
  website: <WebsiteIcon />,
  calendly: <CalendlyIcon />,
  email: <EmailIcon />,
};

const UserManagement = () => {
  const theme = useTheme();
  const [userData, setUserData] = useState(portfolioData.user);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({ ...portfolioData.user });
  const [activeTab, setActiveTab] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState(portfolioData.user.avatar);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [avatarHover, setAvatarHover] = useState(false);

  const handleEdit = () => {
    setTempData({ ...userData });
    setEditMode(true);
  };

  const handleSave = () => {
    setUserData(tempData);
    setEditMode(false);
    showSnackbar('Profile updated successfully!', 'success');
    // Here you would typically make an API call to save the data
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

  const handleSocialChange = (platform, value) => {
    setTempData({
      ...tempData,
      social: {
        ...tempData.social,
        [platform]: value,
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

  const socialPlatforms = [
    { key: 'github', label: 'GitHub', icon: GitHubIcon, color: '#333' },
    { key: 'linkedin', label: 'LinkedIn', icon: LinkedInIcon, color: '#0077b5' },
    { key: 'twitter', label: 'Twitter', icon: TwitterIcon, color: '#1da1f2' },
    { key: 'dribbble', label: 'Dribbble', icon: DribbbleIcon, color: '#ea4c89' },
    { key: 'codepen', label: 'CodePen', icon: CodepenIcon, color: '#000' },
    { key: 'medium', label: 'Medium', icon: MediumIcon, color: '#00ab6c' },
    { key: 'stackoverflow', label: 'Stack Overflow', icon: StackoverflowIcon, color: '#f48024' },
  ];

  return (
    <Container maxWidth="xl">
      {/* Header with Animation */}
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
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.05" fill-rule="evenodd"/%3E%3C/svg%3E")',
              opacity: 0.1,
            }
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
                Profile Dashboard
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage your professional identity and online presence
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
                  animation: `${pulseAnimation} 2s infinite`,
                },
                transition: 'all 0.3s',
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

      {/* Avatar Section with Animation */}
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
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s',
                      }}
                    >
                      <CameraIcon />
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Verified Profile">
                    <VerifiedIcon
                      sx={{
                        color: theme.palette.success.main,
                        fontSize: 40,
                        bgcolor: 'white',
                        borderRadius: '50%',
                        p: 0.5,
                      }}
                    />
                  </Tooltip>
                )
              }
            >
              <Avatar
                src={editMode ? avatarPreview : userData.avatar}
                sx={{
                  width: 150,
                  height: 150,
                  border: `4px solid ${theme.palette.primary.main}`,
                  boxShadow: 6,
                  animation: `${floatAnimation} 3s ease-in-out infinite`,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s',
                }}
                onMouseEnter={() => setAvatarHover(true)}
                onMouseLeave={() => setAvatarHover(false)}
              />
            </Badge>
            {avatarHover && !editMode && (
              <Zoom in={avatarHover}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    animation: `${fadeInUp} 0.3s ease-out`,
                  }}
                >
                  <ViewIcon fontSize="large" />
                </Box>
              </Zoom>
            )}
          </Box>
        </Box>
      </Slide>

      {/* Tabs for Different Sections */}
      <Paper sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            '& .MuiTab-root': {
              py: 2,
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'all 0.3s',
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                transform: 'translateY(-2px)',
              },
            },
          }}
        >
          <Tab icon={<PersonIcon />} label="Personal Info" />
          <Tab icon={<ShareIcon />} label="Social Links" />
          <Tab icon={<PhoneIcon />} label="Contact Info" />
          <Tab icon={<SettingsIcon />} label="Preferences" />
        </Tabs>

        <Box sx={{ p: 3 }}>
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 2,
                        },
                      },
                    }}
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BioIcon color="primary" sx={{ mt: 1 }} />
                        </InputAdornment>
                      ),
                    }}
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
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Fade>
          )}

          {activeTab === 1 && (
            <Fade in={activeTab === 1} timeout={500}>
              <Grid container spacing={2}>
                {socialPlatforms.map((platform) => (
                  <Grid item xs={12} sm={6} md={4} key={platform.key}>
                    <Card
                      sx={{
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4,
                          borderLeft: `4px solid ${platform.color}`,
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <platform.icon sx={{ color: platform.color, mr: 1, fontSize: 24 }} />
                          <Typography variant="h6">{platform.label}</Typography>
                        </Box>
                        {editMode ? (
                          <TextField
                            fullWidth
                            size="small"
                            value={tempData.social?.[platform.key] || ''}
                            onChange={(e) => handleSocialChange(platform.key, e.target.value)}
                            placeholder={`Enter ${platform.label} URL`}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LinkIcon fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        ) : (
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<platform.icon />}
                            href={userData.social?.[platform.key] || '#'}
                            target="_blank"
                            sx={{
                              justifyContent: 'flex-start',
                              textTransform: 'none',
                              borderColor: platform.color,
                              color: platform.color,
                              '&:hover': {
                                bgcolor: alpha(platform.color, 0.1),
                                borderColor: platform.color,
                              },
                            }}
                          >
                            {userData.social?.[platform.key] ? 'Visit Profile' : 'Not Set'}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Fade>
          )}

          {activeTab === 2 && (
            <Fade in={activeTab === 2} timeout={500}>
              <Grid container spacing={3}>
                {Object.entries(editMode ? tempData.contact : userData.contact || {}).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4,
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {contactIcons[key] || <LinkIcon />}
                        <Typography variant="h6" sx={{ ml: 1, textTransform: 'capitalize' }}>
                          {key}
                        </Typography>
                      </Box>
                      {editMode ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={value}
                          onChange={(e) => {
                            setTempData({
                              ...tempData,
                              contact: {
                                ...tempData.contact,
                                [key]: e.target.value,
                              },
                            });
                          }}
                          placeholder={`Enter ${key}`}
                        />
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{
                            p: 1.5,
                            borderRadius: 1,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            wordBreak: 'break-word',
                          }}
                        >
                          {value}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Fade>
          )}

          {activeTab === 3 && (
            <Fade in={activeTab === 3} timeout={500}>
              <Box>
                <Paper
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Availability Status
                  </Typography>
                  {editMode ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      value={tempData.availability || ''}
                      onChange={handleChange}
                      name="availability"
                      placeholder="Describe your availability..."
                      sx={{ mb: 2 }}
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'white',
                        boxShadow: 1,
                        mb: 2,
                      }}
                    >
                      {userData.availability}
                    </Typography>
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editMode ? tempData.preferences?.remote : userData.preferences?.remote}
                        onChange={(e) => {
                          setTempData({
                            ...tempData,
                            preferences: {
                              ...tempData.preferences,
                              remote: e.target.checked,
                            },
                          });
                        }}
                        disabled={!editMode}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FavoriteIcon color="primary" sx={{ mr: 1 }} />
                        <Typography>Open to Remote Work</Typography>
                      </Box>
                    }
                  />
                </Paper>

                {/* Additional Preferences */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Work Preferences
                      </Typography>
                      <Stack spacing={2}>
                        <FormControlLabel
                          control={<Switch checked={true} disabled />}
                          label="Full-time Employment"
                        />
                        <FormControlLabel
                          control={<Switch checked={true} disabled />}
                          label="Freelance Projects"
                        />
                        <FormControlLabel
                          control={<Switch checked={false} disabled />}
                          label="Consulting"
                        />
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Profile Visibility
                      </Typography>
                      <Stack spacing={2}>
                        <FormControlLabel
                          control={<Switch checked={true} disabled />}
                          label="Public Profile"
                        />
                        <FormControlLabel
                          control={<Switch checked={true} disabled />}
                          label="Show Contact Info"
                        />
                        <FormControlLabel
                          control={<Switch checked={false} disabled />}
                          label="Available for Hiring"
                        />
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          )}
        </Box>
      </Paper>

      {/* Quick Stats Cards */}
      <Slide direction="up" in={true} timeout={800}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Typography variant="h4" color="primary">
                {Object.keys(userData.social || {}).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Social Profiles
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: alpha(theme.palette.success.main, 0.1),
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Typography variant="h4" color="success.main">
                100%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Profile Completion
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Typography variant="h4" color="warning.main">
                24/7
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Availability
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: alpha(theme.palette.info.main, 0.1),
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QrIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6" color="info.main">
                  QR Code
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Share Profile
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Slide>

      {/* Action Buttons with Animation */}
      {editMode && (
        <Zoom in={editMode} timeout={300}>
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              boxShadow: 3,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s',
                }}
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
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                  transition: 'all 0.3s',
                }}
              >
                Save All Changes
              </Button>
            </Box>
          </Paper>
        </Zoom>
      )}

      {/* Preview Card */}
      <Fade in={!editMode} timeout={500}>
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Profile Preview
          </Typography>
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <Avatar
                  src={userData.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    border: `3px solid ${theme.palette.primary.main}`,
                    boxShadow: 4,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" gutterBottom>
                  {userData.name}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {userData.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {userData.bio}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {Object.entries(userData.social || {}).map(([platform, url]) => (
                    <Tooltip key={platform} title={platform}>
                      <IconButton
                        component="a"
                        href={url}
                        target="_blank"
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.2),
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.3s',
                        }}
                      >
                        {socialIcons[platform] || <LinkIcon />}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Fade>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            animation: `${fadeInUp} 0.3s ease-out`,
          }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserManagement;