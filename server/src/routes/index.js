const express = require('express')
const router = express.Router()

// Import all route files
const userRoutes = require('./userRoutes');
const galleryRoutes = require('./galleryRoutes');
const videoRoutes = require('./videoRoutes');
const projectRoutes = require('./projectRoutes');
const experienceRoutes = require('./experienceRoutes');
const achievementRoutes = require('./achievementRoutes');
const extracurricularRoutes = require('./extracurricularRoutes');
const languageRoutes = require('./languageRoutes');
const skillRoutes = require('./skillRoutes');
const preferenceRoutes = require('./preferenceRoutes');
const educationRoutes = require('./educationRoutes');
const socialRoutes = require('./socialRoutes');

// Define all routes
const allRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/gallery',
        route: galleryRoutes
    },
    {
        path: '/videos',
        route: videoRoutes
    },
    {
        path: '/projects',
        route: projectRoutes
    },
    {
        path: '/experience',
        route: experienceRoutes
    },
    {
        path: '/achievements',
        route: achievementRoutes
    },
    {
        path: '/extracurricular',
        route: extracurricularRoutes
    },
    {
        path: '/languages',
        route: languageRoutes
    },
    {
        path: '/skills',
        route: skillRoutes
    },
    {
        path: '/preferences',
        route: preferenceRoutes
    },
    {
        path: '/education',
        route: educationRoutes
    },
    {
        path: '/social',
        route: socialRoutes
    }
];

// Register all routes
allRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

// Health check route
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler for undefined routes
router.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

module.exports = router;