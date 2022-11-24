const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const employeeController = require('../controllers/employee.controller');
const { fileUpload } = require('../utils/fileUpload');

router.post('/', auth, employeeController.createEmployee);
router.get('/', auth, employeeController.getEmployees);
router.get('/:employeeId', auth, employeeController.getEmployee);
router.patch('/:employeeId',auth, fileUpload.any(), employeeController.updateEmployee);
router.delete('/:employeeId', auth, employeeController.deleteEmployee);

module.exports = router;
