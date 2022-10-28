const express = require('express');
const router = express.Router();

const roleController = require('../controllers/role.controller');

router.post('/', roleController.createRole);
router.get('/', roleController.getRoles);
router.delete('/:roleId', roleController.deleteRole);

module.exports = router;
