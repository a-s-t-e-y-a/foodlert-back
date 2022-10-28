const express = require('express');
const router = express.Router();

const payrollController = require('../controllers/payrollgroup.controller');

router.post('/', payrollController.createPayroll);
router.get('/', payrollController.getPayrolls);
router.get('/:payrollGroupId', payrollController.getPayroll);
router.patch('/:payrollGroupId', payrollController.updatePayroll);
router.delete('/:payrollGroupId', payrollController.deletePayroll);

module.exports = router;
