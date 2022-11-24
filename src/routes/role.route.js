const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleController = require('../controllers/role.controller');

router.post('/', auth, roleController.createRole);
router.get('/', auth, roleController.getRoles);
router.delete('/:roleId', roleController.deleteRole);

module.exports = router;
