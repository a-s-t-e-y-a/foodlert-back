const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { fileUpload } = require('../utils/fileUpload');
const auth = require('./../middlewares/auth');

router.get('/', userController.getUsers);
router.get('/:userId', auth, userController.getUser);
router.patch('/:userId', auth, fileUpload.any(), userController.updateUser);

module.exports = router;
