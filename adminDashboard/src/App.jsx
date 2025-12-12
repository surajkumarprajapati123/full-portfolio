// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AdminDashboard from './components/AdminDashboard';
import UserManagement from './sections/UserManagement';
import GalleryManagement from './sections/GalleryManagement';
import ProjectManagement from './sections/ProjectManagement';
import ExperienceManagement from './sections/ExperienceManagement';
import AchievementManagement from './sections/AchievementManagement';
import VideoManagement from './sections/VideoManagement';
import ExtracurricularManagement from './sections/ExtracurricularManagement';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="user" element={<UserManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="videos" element={<VideoManagement />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="experience" element={<ExperienceManagement />} />
            <Route path="achievements" element={<AchievementManagement />} />
            <Route path="extracurricular" element={<ExtracurricularManagement />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;