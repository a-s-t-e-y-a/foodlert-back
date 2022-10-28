const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');
const { fileUpload } = require('../utils/fileUpload');

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:employeeId', employeeController.getEmployee);
router.patch('/:employeeId', fileUpload.any(), employeeController.updateEmployee);
router.delete('/:employeeId', employeeController.deleteEmployee);

module.exports = router;
