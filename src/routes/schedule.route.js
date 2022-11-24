const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const scheduleController = require('../controllers/schedule.controller');

router.post('/', auth, scheduleController.createSchedule);
router.post('/publish', scheduleController.publishSchedule);
router.get('/', auth, scheduleController.getSchedules);
router.delete('/:scheduleId', scheduleController.deleteSchedule);

module.exports = router;
