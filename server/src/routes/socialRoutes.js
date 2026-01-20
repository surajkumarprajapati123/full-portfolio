const express = require('express');
const router = express.Router();
const {
  getSocial,
  createSocial,
  updateSocial,
  patchSocial,
  deleteSocial,
  getSocialById,
  ensureSocial,
  getSocialStats,
  validateSocialUrl,
  exportSocial,
  resetSocial,
  getPopularPlatforms,
  addCustomLink,
  updateCustomLink,
  removeCustomLink,
  bulkUpdateSocial
} = require('../controllers/socialController');
const { protect } = require('../middlewares/auth');


// All routes require authentication
router.use(protect);

// GET /api/social - Get user social links
// POST /api/social - Create new social profile
router.route('/')
  .get(getSocial)
  .post(createSocial);

// POST /api/social/ensure - Get or create social profile
router.post('/ensure', ensureSocial);

// GET /api/social/stats - Get social statistics
router.get('/stats', getSocialStats);

// POST /api/social/validate - Validate social URL
router.post('/validate', validateSocialUrl);

// GET /api/social/export - Export social links
router.get('/export', exportSocial);

// POST /api/social/reset - Reset social profile
router.post('/reset', resetSocial);

// GET /api/social/popular/platforms - Get popular platforms
router.get('/popular/platforms', getPopularPlatforms);

// POST /api/social/bulk - Bulk update social links
router.post('/bulk', bulkUpdateSocial);

// GET /api/social/:id - Get social by ID
// PUT /api/social/:id - Update social profile
// PATCH /api/social/:id - Partial update
// DELETE /api/social/:id - Delete social profile
router.route('/:id')
  .get(getSocialById)
  .put(updateSocial)
  .patch(patchSocial)
  .delete(deleteSocial);

// POST /api/social/:id/custom - Add custom link
router.post('/:id/custom', addCustomLink);

// PUT /api/social/:id/custom/:linkId - Update custom link
router.put('/:id/custom/:linkId', updateCustomLink);

// DELETE /api/social/:id/custom/:linkId - Remove custom link
router.delete('/:id/custom/:linkId', removeCustomLink);

module.exports = router;