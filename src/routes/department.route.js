const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/department.controller');
const auth = require('./../middlewares/auth');

router.post('/', auth, departmentController.createDepartment);
router.get('/', auth, departmentController.getDepartmentes);
router.delete('/:departmentId', auth, departmentController.deleteDepartment);

module.exports = router;
