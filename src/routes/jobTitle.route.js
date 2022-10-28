const express = require('express');
const router = express.Router();

const jobTitleController = require('../controllers/jobTitle.controller');

router.post('/', jobTitleController.createJobTitle);
router.get('/', jobTitleController.getJobTitles);
router.delete('/:jobTitleId', jobTitleController.deleteJobTitle);

module.exports = router;
