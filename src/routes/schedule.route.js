const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/schedule.controller');

router.post('/', scheduleController.createSchedule);
router.post('/publish', scheduleController.publishSchedule);
router.get('/', scheduleController.getSchedules);
router.delete('/:scheduleId', scheduleController.deleteSchedule);

module.exports = router;
