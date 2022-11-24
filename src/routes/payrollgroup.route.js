const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const payrollController = require('../controllers/payrollgroup.controller');

router.post('/', auth, payrollController.createPayroll);
router.get('/', auth, payrollController.getPayrolls);
router.get('/:payrollGroupId',auth, payrollController.getPayroll);
router.patch('/:payrollGroupId', auth, payrollController.updatePayroll);
router.delete('/:payrollGroupId', auth, payrollController.deletePayroll);

module.exports = router;
