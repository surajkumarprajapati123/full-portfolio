const express = require('express');
const router = express.Router();

const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  updateSkillsOrder,
  deleteSkill
} = require('../controllers/skillController');
const { protect } = require('../middlewares/auth');

router.use(protect);

router.route('/')
  .get(getSkills)
  .post(createSkill);

router.route('/:id')
  .get(getSkill)
  .put(updateSkill)
  .delete(deleteSkill);

router.put('/update-order', updateSkillsOrder);

module.exports = router;