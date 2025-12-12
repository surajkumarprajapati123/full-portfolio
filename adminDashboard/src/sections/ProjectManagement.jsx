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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tab,
  Tabs,
  Autocomplete,
  InputAdornment,
  Tooltip,
  Avatar,
  AvatarGroup,
  Rating,
  LinearProgress,
  Badge,
  Fade,
  Zoom,
  Slide,
  Grow,
  Fab,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  StarHalf as StarHalfIcon,
  GitHub as GitHubIcon,
  PlayArrow as LiveIcon,
  Android as AndroidIcon,
  Apple as AppleIcon,
  Link as LinkIcon,
  Code as CodeIcon,
  Group as GroupIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  ThumbUp as ThumbUpIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Category as CategoryIcon,
  Build as BuildIcon,
  Cloud as CloudIcon,
  MobileFriendly as MobileFriendlyIcon,
  DesignServices as DesignIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon,
  TrendingFlat as TrendingFlatIcon,
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../portfolioData';

const ProjectManagement = () => {
  const [projects, setProjects] = useState(portfolioData.projects);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [newFeature, setNewFeature] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFeatured, setShowFeatured] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    banner: '',
    screenshot: '',
    technologies: [],
    category: 'Full Stack',
    liveUrl: '',
    githubUrl: '',
    appStoreUrl: '',
    playStoreUrl: '',
    featured: false,
    status: 'In Development',
    launchDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    difficulty: 'medium',
    teamMembers: [],
    metrics: {
      developmentTime: '',
      teamSize: '',
      status: '',
      users: '',
      rating: 4.5,
    },
    details: {
      overview: '',
      challenges: '',
      solution: '',
      features: [],
    }
  });

  const technologyOptions = [
    'React', 'Node.js', 'TypeScript', 'Next.js', 'Vue.js', 'Angular',
    'Express.js', 'MongoDB', 'PostgreSQL', 'Firebase', 'AWS', 'Docker',
    'Kubernetes', 'GraphQL', 'Redux', 'Tailwind CSS', 'Material-UI',
    'React Native', 'Flutter', 'Python', 'Django', 'FastAPI', 'Java',
    'Spring Boot', 'PHP', 'Laravel', 'WordPress', 'Shopify'
  ];

  const categories = ['Full Stack', 'Frontend', 'Backend', 'Mobile', 'Desktop', 'DevOps', 'Design'];
  const statusOptions = ['In Development', 'Live Production', 'Beta Testing', 'On Hold', 'Archived', 'Planned'];
  const priorityOptions = ['low', 'medium', 'high', 'critical'];
  const difficultyOptions = ['beginner', 'intermediate', 'advanced', 'expert'];

  // Filter and sort projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesFeatured = !showFeatured || project.featured;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'date': return new Date(b.launchDate) - new Date(a.launchDate);
      case 'name': return a.title.localeCompare(b.title);
      case 'rating': return b.metrics.rating - a.metrics.rating;
      default: return 0;
    }
  });

  // Stats calculations
  const stats = {
    total: projects.length,
    live: projects.filter(p => p.status === 'Live Production').length,
    inDevelopment: projects.filter(p => p.status === 'In Development').length,
    featured: projects.filter(p => p.featured).length,
    totalTechnologies: [...new Set(projects.flatMap(p => p.technologies))].length,
    avgRating: projects.reduce((acc, p) => acc + (p.metrics.rating || 0), 0) / projects.length,
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setNewProject({
      title: '',
      description: '',
      banner: '',
      screenshot: '',
      technologies: [],
      category: 'Full Stack',
      liveUrl: '',
      githubUrl: '',
      appStoreUrl: '',
      playStoreUrl: '',
      featured: false,
      status: 'In Development',
      launchDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      difficulty: 'medium',
      teamMembers: [],
      metrics: {
        developmentTime: '',
        teamSize: '',
        status: '',
        users: '',
        rating: 4.5,
      },
      details: {
        overview: '',
        challenges: '',
        solution: '',
        features: [],
      }
    });
    setActiveTab(0);
    setOpenDialog(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setNewProject({ ...project });
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
      showSnackbar('Project deleted successfully!', 'success');
    }
  };

  const handleSave = () => {
    const projectToSave = {
      ...newProject,
      id: editingProject ? editingProject.id : Date.now(),
      metrics: {
        ...newProject.metrics,
        developmentTime: newProject.metrics.developmentTime || 'Not specified',
        teamSize: newProject.metrics.teamSize || 'Solo project',
      },
      details: {
        ...newProject.details,
        features: Array.isArray(newProject.details.features) 
          ? newProject.details.features 
          : newProject.details.features.split(',').map(f => f.trim()).filter(f => f)
      }
    };

    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? projectToSave : p));
      showSnackbar('Project updated successfully!', 'success');
    } else {
      setProjects([...projects, projectToSave]);
      showSnackbar('Project added successfully!', 'success');
    }

    setOpenDialog(false);
    setEditingProject(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setNewProject({
        ...newProject,
        details: {
          ...newProject.details,
          features: [...(newProject.details.features || []), newFeature.trim()]
        }
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...(newProject.details.features || [])];
    updatedFeatures.splice(index, 1);
    setNewProject({
      ...newProject,
      details: {
        ...newProject.details,
        features: updatedFeatures
      }
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Frontend': return <CodeIcon />;
      case 'Backend': return <StorageIcon />;
      case 'Mobile': return <MobileFriendlyIcon />;
      case 'Design': return <DesignIcon />;
      case 'DevOps': return <CloudIcon />;
      default: return <BuildIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Live Production': return 'success';
      case 'In Development': return 'warning';
      case 'Beta Testing': return 'info';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'title', 
      headerName: 'Project', 
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={params.row.banner || params.row.screenshot}
            variant="rounded"
            sx={{ width: 48, height: 48, borderRadius: 2 }}
          >
            {params.row.title.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {params.row.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.category}
            </Typography>
          </Box>
        </Box>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 140,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small"
          color={getStatusColor(params.value)}
          variant="outlined"
        />
      )
    },
    { 
      field: 'featured', 
      headerName: 'Featured', 
      width: 100,
      renderCell: (params) => (
        params.value ? (
          <Tooltip title="Featured Project">
            <StarIcon sx={{ color: '#FFD700' }} />
          </Tooltip>
        ) : null
      )
    },
    { 
      field: 'metrics.rating', 
      headerName: 'Rating', 
      width: 140,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={params.value || 0} size="small" readOnly precision={0.5} />
          <Typography variant="body2">{params.value?.toFixed(1) || 'N/A'}</Typography>
        </Box>
      )
    },
    { 
      field: 'launchDate', 
      headerName: 'Launch Date', 
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      )
    },
    { 
      field: 'technologies', 
      headerName: 'Tech Stack', 
      width: 200,
      renderCell: (params) => (
        <AvatarGroup max={3}>
          {params.value.slice(0, 3).map((tech, index) => (
            <Tooltip key={index} title={tech}>
              <Avatar sx={{ width: 24, height: 24, bgcolor: '#2196f3' }}>
                {tech.charAt(0)}
              </Avatar>
            </Tooltip>
          ))}
        </AvatarGroup>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  const ProjectCard = ({ project }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        }
      }}>
        {/* Featured Badge */}
        {project.featured && (
          <Box sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16, 
            zIndex: 2 
          }}>
            <Tooltip title="Featured Project">
              <StarIcon sx={{ 
                fontSize: 32, 
                color: '#FFD700',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }} />
            </Tooltip>
          </Box>
        )}

        {/* Project Image with Overlay */}
        <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="200"
            image={project.banner || project.screenshot}
            alt={project.title}
            sx={{ 
              objectFit: 'cover',
              transition: 'transform 0.5s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            p: 2,
            color: 'white'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {project.title}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {project.description}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {getCategoryIcon(project.category)}
            <Chip 
              label={project.category} 
              size="small" 
              sx={{ mr: 1 }}
            />
            <Chip 
              label={project.status} 
              size="small"
              color={getStatusColor(project.status)}
              variant="outlined"
            />
          </Box>

          {/* Rating and Stats */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={project.metrics.rating || 0} size="small" readOnly precision={0.5} />
              {/* <Typography variant="body2">
                {project.metrics.rating?.toFixed(1) || 'N/A'}
              </Typography> */}
            </Box>
            <Typography variant="caption" color="text.secondary">
              {project.metrics.users || '0'} users
            </Typography>
          </Box>

          {/* Tech Stack */}
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Tech Stack:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {project.technologies.slice(0, 5).map((tech, index) => (
              <Chip 
                key={index} 
                label={tech} 
                size="small" 
                variant="outlined"
                sx={{ 
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  borderColor: 'rgba(33, 150, 243, 0.3)',
                  '& .MuiChip-label': {
                    fontSize: '0.75rem'
                  }
                }}
              />
            ))}
            {project.technologies.length > 5 && (
              <Chip 
                label={`+${project.technologies.length - 5}`} 
                size="small" 
                variant="outlined"
              />
            )}
          </Box>

          {/* Progress Bar for Development Status */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption">Progress</Typography>
              <Typography variant="caption">
                {project.status === 'Live Production' ? '100%' : 
                 project.status === 'In Development' ? '75%' : '50%'}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={project.status === 'Live Production' ? 100 : 
                    project.status === 'In Development' ? 75 : 50}
              sx={{ 
                height: 6, 
                borderRadius: 3,
                bgcolor: 'rgba(0,0,0,0.1)'
              }}
            />
          </Box>
        </CardContent>

        <CardActions sx={{ 
          justifyContent: 'space-between', 
          p: 2, 
          pt: 0,
          borderTop: '1px solid rgba(0,0,0,0.08)'
        }}>
          <Box>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => handleEdit(project)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={() => handleDelete(project.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            {project.liveUrl && (
              <Tooltip title="Live Demo">
                <IconButton size="small" component="a" href={project.liveUrl} target="_blank">
                  <LiveIcon />
                </IconButton>
              </Tooltip>
            )}
            {project.githubUrl && (
              <Tooltip title="GitHub">
                <IconButton size="small" component="a" href={project.githubUrl} target="_blank">
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </CardActions>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
              Project Portfolio
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and showcase your amazing projects
            </Typography>
          </Box>
          <Fab
            variant="extended"
            color="primary"
            onClick={handleAddNew}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
              }
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Add New Project
          </Fab>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { label: 'Total Projects', value: stats.total, icon: <CodeIcon />, color: '#6366f1' },
            { label: 'Live Projects', value: stats.live, icon: <TrendingUpIcon />, color: '#10b981' },
            { label: 'In Development', value: stats.inDevelopment, icon: <BuildIcon />, color: '#f59e0b' },
            { label: 'Featured', value: stats.featured, icon: <StarIcon />, color: '#f59e0b' },
            { label: 'Technologies', value: stats.totalTechnologies, icon: <BuildIcon />, color: '#8b5cf6' },
            { label: 'Avg Rating', value: stats.avgRating.toFixed(1), icon: <StarHalfIcon />, color: '#ec4899' },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Paper sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                  border: `1px solid ${stat.color}30`,
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}>
                  <Box sx={{ 
                    display: 'inline-flex', 
                    p: 1.5, 
                    borderRadius: '50%', 
                    bgcolor: `${stat.color}20`,
                    mb: 2
                  }}>
                    {React.cloneElement(stat.icon, { sx: { fontSize: 24, color: stat.color } })}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Filters and Search */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterCategory}
                  label="Category"
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  {statusOptions.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="date">Launch Date</MenuItem>
                  <MenuItem value="name">Project Name</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showFeatured}
                    onChange={(e) => setShowFeatured(e.target.checked)}
                    color="primary"
                  />
                }
                label="Featured Only"
              />
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* View Mode Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <ButtonGroup variant="outlined" size="small">
          <Button 
            onClick={() => setViewMode('grid')}
            variant={viewMode === 'grid' ? 'contained' : 'outlined'}
          >
            Grid View
          </Button>
          <Button 
            onClick={() => setViewMode('list')}
            variant={viewMode === 'list' ? 'contained' : 'outlined'}
          >
            List View
          </Button>
        </ButtonGroup>
      </Box>

      {/* Projects Display */}
      {viewMode === 'grid' ? (
        <Grid container spacing={3}>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      ) : (
        <Paper sx={{ height: 600, width: '100%', borderRadius: 3, overflow: 'hidden' }}>
          <DataGrid
            rows={filteredProjects}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            onRowClick={(params) => handleEdit(params.row)}
            components={{ Toolbar: GridToolbar }}
            sx={{ 
              border: 0,
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: 'rgba(0,0,0,0.02)',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
              },
              '& .MuiDataGrid-row:hover': {
                bgcolor: 'rgba(33, 150, 243, 0.04)',
              },
            }}
          />
        </Paper>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper sx={{ 
            p: 8, 
            textAlign: 'center', 
            borderRadius: 3,
            bgcolor: 'rgba(0,0,0,0.02)'
          }}>
            <CodeIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 3, opacity: 0.5 }} />
            <Typography variant="h5" gutterBottom>
              No projects found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your filters or add a new project
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddNew}
              sx={{ borderRadius: 2 }}
            >
              Create Your First Project
            </Button>
          </Paper>
        </motion.div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ 
          sx: { 
            maxHeight: '90vh',
            borderRadius: 3,
            overflow: 'hidden'
          } 
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Typography variant="h6">
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            sx={{ mb: 3 }}
            variant="fullWidth"
          >
            <Tab icon={<BuildIcon />} label="Basic Info" />
            <Tab icon={<CodeIcon />} label="Details" />
            <Tab icon={<TrendingUpIcon />} label="Metrics" />
            <Tab icon={<LinkIcon />} label="Links" />
          </Tabs>

          {/* Tab Content - Similar to before but enhanced */}
          {activeTab === 0 && (
            <Grid container spacing={2}>
              {/* Enhanced form fields with better styling */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BuildIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* ... other form fields with similar enhancements */}
            </Grid>
          )}

          {/* Similar enhanced layouts for other tabs */}
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            startIcon={editingProject ? <EditIcon /> : <AddIcon />}
          >
            {editingProject ? 'Update Project' : 'Create Project'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Missing ButtonGroup import - Add this
import ButtonGroup from '@mui/material/ButtonGroup';

export { portfolioData };
export default ProjectManagement;