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
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Tab,
  Tabs,
  Stack,
  Tooltip,
  Badge,
  Avatar,
  Fade,
  Slide,
  Grow,
  Zoom,
  Container,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Work as WorkIcon,
  DateRange as DateIcon,
  Code as CodeIcon,
  ExpandMore as ExpandMoreIcon,
  AddCircle as AddCircleIcon,
  RemoveCircle as RemoveCircleIcon,
  Star as StarIcon,
  TrendingUp as TrendingIcon,
  Architecture as ArchitectureIcon,
  Settings as SettingsIcon,
  DesignServices as DesignIcon,
  Cloud as CloudIcon,
  Groups as GroupsIcon,
  Psychology as PsychologyIcon,
  AutoAwesome as AutoAwesomeIcon,
  RocketLaunch as RocketLaunchIcon,
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckIcon,
  Timeline as TimelineIcon,
  HistoryEdu as HistoryEduIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { keyframes } from '@emotion/react';

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
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

const ExperienceManagement = () => {
  const theme = useTheme();
  const [experiences, setExperiences] = useState(portfolioData.experience);
  const [expertise, setExpertise] = useState(portfolioData.expertise);
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openExpertiseDialog, setOpenExpertiseDialog] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [editingSpecialization, setEditingSpecialization] = useState(null);
  const [newExperience, setNewExperience] = useState({
    role: '',
    company: '',
    period: '',
    description: '',
    technologies: [],
    achievements: [''],
  });
  const [newSpecialization, setNewSpecialization] = useState({
    title: '',
    description: '',
    icon: '🏗️',
    technologies: [],
  });
  const [newMethodology, setNewMethodology] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const technologyOptions = [
    'React', 'TypeScript', 'Next.js', 'Node.js', 'Express.js', 'MongoDB',
    'PostgreSQL', 'GraphQL', 'AWS', 'Docker', 'Kubernetes', 'Python',
    'Java', 'Spring Boot', 'C#', '.NET', 'PHP', 'Laravel',
    'Vue.js', 'Angular', 'Svelte', 'Flutter', 'React Native',
    'Redux', 'Tailwind CSS', 'Material-UI', 'Bootstrap',
    'Jest', 'Cypress', 'Git', 'Jenkins', 'GitHub Actions'
  ];

  const expertiseIcons = {
    'Frontend Architecture': <ArchitectureIcon />,
    'Backend Development': <SettingsIcon />,
    'DevOps & Cloud': <CloudIcon />,
    'UI/UX Design': <DesignIcon />,
    '🏗️': <ArchitectureIcon />,
    '⚙️': <SettingsIcon />,
    '☁️': <CloudIcon />,
    '🎨': <DesignIcon />,
  };

  const handleAddNew = () => {
    setEditingExp(null);
    setNewExperience({
      role: '',
      company: '',
      period: '',
      description: '',
      technologies: [],
      achievements: [''],
    });
    setOpenDialog(true);
  };

  const handleAddSpecialization = () => {
    setEditingSpecialization(null);
    setNewSpecialization({
      title: '',
      description: '',
      icon: '🏗️',
      technologies: [],
    });
    setOpenExpertiseDialog(true);
  };

  const handleEdit = (exp) => {
    setEditingExp(exp);
    setNewExperience({ ...exp });
    setOpenDialog(true);
  };

  const handleEditSpecialization = (spec) => {
    setEditingSpecialization(spec);
    setNewSpecialization({ ...spec });
    setOpenExpertiseDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const handleDeleteSpecialization = (index) => {
    const updatedSpecializations = [...expertise.specializations];
    updatedSpecializations.splice(index, 1);
    setExpertise({ ...expertise, specializations: updatedSpecializations });
  };

  const handleDeleteMethodology = (index) => {
    const updatedMethodologies = [...expertise.methodologies];
    updatedMethodologies.splice(index, 1);
    setExpertise({ ...expertise, methodologies: updatedMethodologies });
  };

  const handleDeleteSoftSkill = (index) => {
    const updatedSoftSkills = [...expertise.softSkills];
    updatedSoftSkills.splice(index, 1);
    setExpertise({ ...expertise, softSkills: updatedSoftSkills });
  };

  const handleSave = () => {
    const expToSave = {
      ...newExperience,
      id: editingExp ? editingExp.id : Date.now(),
      achievements: newExperience.achievements.filter(ach => ach.trim() !== '')
    };

    if (editingExp) {
      setExperiences(experiences.map(e => e.id === editingExp.id ? expToSave : e));
    } else {
      setExperiences([...experiences, expToSave]);
    }

    setOpenDialog(false);
    setEditingExp(null);
  };

  const handleSaveSpecialization = () => {
    const specToSave = {
      ...newSpecialization,
      technologies: Array.isArray(newSpecialization.technologies) 
        ? newSpecialization.technologies 
        : []
    };

    if (editingSpecialization) {
      const index = expertise.specializations.findIndex(s => s.title === editingSpecialization.title);
      const updated = [...expertise.specializations];
      updated[index] = specToSave;
      setExpertise({ ...expertise, specializations: updated });
    } else {
      setExpertise({ 
        ...expertise, 
        specializations: [...expertise.specializations, specToSave] 
      });
    }

    setOpenExpertiseDialog(false);
    setEditingSpecialization(null);
  };

  const handleAddMethodology = () => {
    if (newMethodology.trim()) {
      setExpertise({ 
        ...expertise, 
        methodologies: [...expertise.methodologies, newMethodology.trim()] 
      });
      setNewMethodology('');
    }
  };

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim()) {
      setExpertise({ 
        ...expertise, 
        softSkills: [...expertise.softSkills, newSoftSkill.trim()] 
      });
      setNewSoftSkill('');
    }
  };

  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...newExperience.achievements];
    updatedAchievements[index] = value;
    setNewExperience({
      ...newExperience,
      achievements: updatedAchievements
    });
  };

  const handleAddAchievement = () => {
    setNewExperience({
      ...newExperience,
      achievements: [...newExperience.achievements, '']
    });
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = [...newExperience.achievements];
    updatedAchievements.splice(index, 1);
    setNewExperience({
      ...newExperience,
      achievements: updatedAchievements
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'role', 
      headerName: 'Role', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Box>
            <Typography variant="body2">{params.value}</Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.company}
            </Typography>
          </Box>
        </Box>
      )
    },
    { field: 'company', headerName: 'Company', width: 180 },
    { field: 'period', headerName: 'Period', width: 150 },
    { 
      field: 'technologies', 
      headerName: 'Technologies', 
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {params.value.slice(0, 3).map((tech, index) => (
            <Chip key={index} label={tech} size="small" />
          ))}
          {params.value.length > 3 && (
            <Chip label={`+${params.value.length - 3}`} size="small" />
          )}
        </Box>
      )
    },
    { 
      field: 'achievements', 
      headerName: 'Achievements', 
      width: 120,
      renderCell: (params) => (
        <Chip label={`${params.value.length} achievements`} size="small" variant="outlined" />
      )
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Grow in={true} timeout={800}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.1,
            }
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                  Experience & Expertise
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Manage your professional journey and technical skills
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<WorkIcon />}
                  onClick={handleAddNew}
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: 'white',
                      transform: 'scale(1.05)',
                    },
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: 4,
                    transition: 'all 0.3s',
                  }}
                >
                  Add Experience
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AutoAwesomeIcon />}
                  onClick={handleAddSpecialization}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: alpha('#fff', 0.1),
                    },
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    transition: 'all 0.3s',
                  }}
                >
                  Add Expertise
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grow>
      </Box>

      {/* Tabs */}
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
          <Tab icon={<TimelineIcon />} label="Work Timeline" />
          <Tab icon={<StarIcon />} label="Expertise & Skills" />
          <Tab icon={<HistoryEduIcon />} label="Experience List" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Fade in={activeTab === 0} timeout={500}>
              <Box>
                {/* Timeline View */}
                <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                  <TimelineIcon sx={{ mr: 1 }} />
                  Professional Journey
                </Typography>
                <Box sx={{ position: 'relative', ml: { xs: 1, md: 2 } }}>
                  {/* Timeline line */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      bgcolor: 'primary.main',
                      borderRadius: 2,
                      [theme.breakpoints.down('sm')]: {
                        width: 2,
                      },
                    }}
                  />
                  
                  {experiences.map((exp, index) => (
                    <Slide direction="up" in={true} timeout={300 + (index * 100)} key={exp.id}>
                      <Box sx={{ position: 'relative', mb: 4, ml: { xs: 3, md: 4 } }}>
                        {/* Timeline dot */}
                        <Box
                          sx={{
                            position: 'absolute',
                            left: -14,
                            top: 8,
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            border: '3px solid white',
                            boxShadow: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            [theme.breakpoints.down('sm')]: {
                              width: 18,
                              height: 18,
                              left: -10,
                            },
                          }}
                        >
                          <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {index + 1}
                          </Typography>
                        </Box>
                        
                        <Paper 
                          sx={{ 
                            p: 3, 
                            position: 'relative',
                            borderRadius: 3,
                            transition: 'all 0.3s',
                            '&:hover': {
                              transform: 'translateX(8px)',
                              boxShadow: 6,
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography variant="h6" sx={{ 
                                fontWeight: 700,
                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}>
                                {exp.role}
                              </Typography>
                              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mt: 0.5 }}>
                                {exp.company}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <DateIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                <Chip
                                  label={exp.period}
                                  size="small"
                                  sx={{ 
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontWeight: 500,
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title="Edit">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleEdit(exp)}
                                  sx={{
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    '&:hover': {
                                      bgcolor: theme.palette.primary.main,
                                      color: 'white',
                                    },
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleDelete(exp.id)}
                                  sx={{
                                    bgcolor: alpha(theme.palette.error.main, 0.1),
                                    '&:hover': {
                                      bgcolor: theme.palette.error.main,
                                      color: 'white',
                                    },
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" paragraph sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                            {exp.description}
                          </Typography>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                              <CodeIcon sx={{ mr: 1, fontSize: 18 }} />
                              Technologies Used:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {exp.technologies.map((tech, idx) => (
                                <Chip
                                  key={idx}
                                  label={tech}
                                  size="small"
                                  icon={<CodeIcon />}
                                  variant="outlined"
                                  sx={{
                                    animation: `${floatAnimation} ${2 + idx * 0.5}s ease-in-out infinite`,
                                    '&:hover': {
                                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                          
                          <Accordion sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                            <AccordionSummary 
                              expandIcon={<ExpandMoreIcon />}
                              sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                borderRadius: 1,
                                '&.Mui-expanded': {
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <StarIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  Key Achievements ({exp.achievements.length})
                                </Typography>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <List dense sx={{ p: 0 }}>
                                {exp.achievements.map((achievement, idx) => (
                                  <ListItem 
                                    key={idx} 
                                    sx={{ 
                                      py: 0.5,
                                      animation: `${fadeInUp} ${0.5 + idx * 0.1}s ease-out`,
                                    }}
                                  >
                                    <ListItemText 
                                      primary={
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                          <CheckIcon sx={{ mr: 1, mt: 0.5, color: 'success.main', fontSize: 16 }} />
                                          <Typography variant="body2">{achievement}</Typography>
                                        </Box>
                                      }
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        </Paper>
                      </Box>
                    </Slide>
                  ))}
                </Box>
              </Box>
            </Fade>
          )}

          {activeTab === 1 && (
            <Fade in={activeTab === 1} timeout={500}>
              <Box>
                <Grid container spacing={3}>
                  {/* Specializations */}
                  <Grid item xs={12}>
                    <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                          <AutoAwesomeIcon sx={{ mr: 1 }} />
                          Technical Specializations
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={handleAddSpecialization}
                          size="small"
                        >
                          Add Specialization
                        </Button>
                      </Box>
                      <Grid container spacing={3}>
                        {expertise.specializations.map((spec, index) => (
                          <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                              sx={{
                                height: '100%',
                                transition: 'all 0.3s',
                                '&:hover': {
                                  transform: 'translateY(-8px)',
                                  boxShadow: 6,
                                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                                },
                              }}
                            >
                              <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <Avatar
                                    sx={{
                                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                                      color: theme.palette.primary.main,
                                      width: 48,
                                      height: 48,
                                      mr: 2,
                                      animation: `${floatAnimation} 3s ease-in-out infinite`,
                                    }}
                                  >
                                    {expertiseIcons[spec.icon] || spec.icon}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="h6">{spec.title}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {spec.technologies.length} technologies
                                    </Typography>
                                  </Box>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                  {spec.description}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {spec.technologies.slice(0, 3).map((tech, idx) => (
                                    <Chip key={idx} label={tech} size="small" />
                                  ))}
                                  {spec.technologies.length > 3 && (
                                    <Chip label={`+${spec.technologies.length - 3}`} size="small" />
                                  )}
                                </Box>
                              </CardContent>
                              <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                                <Tooltip title="Edit">
                                  <IconButton 
                                    size="small" 
                                    onClick={() => handleEditSpecialization(spec)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton 
                                    size="small" 
                                    onClick={() => handleDeleteSpecialization(index)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </CardActions>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Methodologies */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <RocketLaunchIcon sx={{ mr: 1 }} />
                        Development Methodologies
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Add Methodology"
                            value={newMethodology}
                            onChange={(e) => setNewMethodology(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddMethodology()}
                          />
                          <Button variant="contained" onClick={handleAddMethodology}>
                            Add
                          </Button>
                        </Box>
                      </Box>
                      <Stack spacing={1}>
                        {expertise.methodologies.map((method, index) => (
                          <Paper
                            key={index}
                            sx={{
                              p: 2,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                              transition: 'all 0.3s',
                              '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CheckIcon sx={{ mr: 1, color: 'success.main' }} />
                              <Typography>{method}</Typography>
                            </Box>
                            <IconButton 
                              size="small" 
                              onClick={() => handleDeleteMethodology(index)}
                              sx={{ color: 'error.main' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Paper>
                        ))}
                      </Stack>
                    </Paper>
                  </Grid>

                  {/* Soft Skills */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <PsychologyIcon sx={{ mr: 1 }} />
                        Soft Skills
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Add Soft Skill"
                            value={newSoftSkill}
                            onChange={(e) => setNewSoftSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSoftSkill()}
                          />
                          <Button variant="contained" onClick={handleAddSoftSkill}>
                            Add
                          </Button>
                        </Box>
                      </Box>
                      <Grid container spacing={1}>
                        {expertise.softSkills.map((skill, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Paper
                              sx={{
                                p: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                bgcolor: alpha(theme.palette.secondary.main, 0.05),
                                transition: 'all 0.3s',
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                  transform: 'translateX(4px)',
                                },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <GroupsIcon sx={{ mr: 1, color: 'secondary.main' }} />
                                <Typography>{skill}</Typography>
                              </Box>
                              <IconButton 
                                size="small" 
                                onClick={() => handleDeleteSoftSkill(index)}
                                sx={{ color: 'error.main' }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          )}

          {activeTab === 2 && (
            <Fade in={activeTab === 2} timeout={500}>
              <Box>
                {/* Data Grid View */}
                <Paper sx={{ p: 2, borderRadius: 3, mb: 3 }}>
                  <Box sx={{ height: 500, width: '100%' }}>
                    <DataGrid
                      rows={experiences}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10, 25, 50]}
                      checkboxSelection
                      disableSelectionOnClick
                      onRowClick={(params) => handleEdit(params.row)}
                      components={{
                        Toolbar: () => (
                          <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">
                              Work Experience ({experiences.length})
                            </Typography>
                            <Box>
                              <Button startIcon={<AddIcon />} onClick={handleAddNew}>
                                Add New
                              </Button>
                            </Box>
                          </Box>
                        ),
                      }}
                      sx={{
                        '& .MuiDataGrid-cell:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                        },
                        '& .MuiDataGrid-row:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                        },
                      }}
                    />
                  </Box>
                </Paper>
              </Box>
            </Fade>
          )}
        </Box>
      </Paper>

      {/* Add/Edit Experience Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          {editingExp ? 'Edit Experience' : 'Add New Experience'}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Role/Position"
                value={newExperience.role}
                onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                required
                InputProps={{
                  startAdornment: (
                    <WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Period"
                placeholder="e.g., 2020 - Present"
                value={newExperience.period}
                onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                required
                InputProps={{
                  startAdornment: (
                    <DateIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={technologyOptions}
                value={newExperience.technologies}
                onChange={(event, newValue) => {
                  setNewExperience({ ...newExperience, technologies: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Technologies Used" placeholder="Add technology" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip 
                      label={option} 
                      {...getTagProps({ index })} 
                      size="small" 
                      sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                  ))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Key Achievements
              </Typography>
              {newExperience.achievements.map((achievement, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                    placeholder="Enter achievement"
                  />
                  {newExperience.achievements.length > 1 && (
                    <IconButton 
                      size="small" 
                      onClick={() => handleRemoveAchievement(index)}
                      color="error"
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<AddCircleIcon />}
                onClick={handleAddAchievement}
                size="small"
                sx={{ mt: 1 }}
              >
                Add Achievement
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            {editingExp ? 'Update Experience' : 'Add Experience'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Specialization Dialog */}
      <Dialog 
        open={openExpertiseDialog} 
        onClose={() => setOpenExpertiseDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ bgcolor: 'secondary.main', color: 'white' }}>
          {editingSpecialization ? 'Edit Specialization' : 'Add New Specialization'}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Specialization Title"
                value={newSpecialization.title}
                onChange={(e) => setNewSpecialization({ ...newSpecialization, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={newSpecialization.description}
                onChange={(e) => setNewSpecialization({ ...newSpecialization, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Icon"
                value={newSpecialization.icon}
                onChange={(e) => setNewSpecialization({ ...newSpecialization, icon: e.target.value })}
                placeholder="Enter emoji or choose from: 🏗️ ⚙️ ☁️ 🎨"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={technologyOptions}
                value={newSpecialization.technologies}
                onChange={(event, newValue) => {
                  setNewSpecialization({ ...newSpecialization, technologies: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Technologies" placeholder="Add technology" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip 
                      label={option} 
                      {...getTagProps({ index })} 
                      size="small" 
                      sx={{ 
                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
                        color: theme.palette.secondary.main,
                      }}
                    />
                  ))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenExpertiseDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveSpecialization} variant="contained" color="secondary">
            {editingSpecialization ? 'Update Specialization' : 'Add Specialization'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

// Add missing import
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

export default ExperienceManagement;