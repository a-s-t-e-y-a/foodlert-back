const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const jobTitleController = require('../controllers/jobTitle.controller');

router.post('/', auth, jobTitleController.createJobTitle);
router.get('/', auth, jobTitleController.getJobTitles);
router.delete('/:jobTitleId', auth, jobTitleController.deleteJobTitle);

module.exports = router;
