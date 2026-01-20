const express = require('express');
const router = express.Router();
const {
  getLanguages,
  getLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage
} = require('../controllers/languageController');
const { protect } = require('../middlewares/auth');

router.use(protect);

router.route('/')
  .get(getLanguages)
  .post(createLanguage);

router.route('/:id')
  .get(getLanguage)
  .put(updateLanguage)
  .delete(deleteLanguage);

module.exports = router;