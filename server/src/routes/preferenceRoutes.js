const express = require('express');
const router = express.Router();
const {
  getPreferences,
  createPreferences,
  updatePreferences,
  patchPreferences,
  deletePreferences,
  getPreferencesById,
  ensurePreferences,
  getPreferencesStats,
  getSuggestions,
  getSimilarUsers,
  getPopularJobTitles,
  getSalaryBenchmarks,
  resetPreferences,
  exportPreferences,
  bulkUpdatePreferences
} = require('../controllers/preferenceController');
const { protect } = require('../middlewares/auth');


// All routes require authentication
router.use(protect);

// GET /api/preferences - Get user preferences
// POST /api/preferences - Create new preferences
router.route('/')
  .get(getPreferences)
  .post(createPreferences);

// POST /api/preferences/ensure - Get or create preferences
router.post('/ensure', ensurePreferences);

// POST /api/preferences/bulk - Bulk update preferences
router.post('/bulk', bulkUpdatePreferences);

// GET /api/preferences/stats - Get preferences statistics
router.get('/stats', getPreferencesStats);

// GET /api/preferences/suggestions - Get suggestions based on profile
router.get('/suggestions', getSuggestions);

// GET /api/preferences/similar-users - Get users with similar preferences
router.get('/similar-users', getSimilarUsers);

// GET /api/preferences/popular/titles - Get popular job titles
router.get('/popular/titles', getPopularJobTitles);

// GET /api/preferences/benchmarks/salary - Get salary benchmarks
router.get('/benchmarks/salary', getSalaryBenchmarks);

// POST /api/preferences/reset - Reset to default preferences
router.post('/reset', resetPreferences);

// GET /api/preferences/export - Export preferences as JSON
router.get('/export', exportPreferences);

// GET /api/preferences/:id - Get preferences by ID
// PUT /api/preferences/:id - Update preferences
// PATCH /api/preferences/:id - Partial update preferences
// DELETE /api/preferences/:id - Delete preferences
router.route('/:id')
  .get(getPreferencesById)
  .put(updatePreferences)
  .patch(patchPreferences)
  .delete(deletePreferences);

module.exports = router;