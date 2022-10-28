const express = require('express');
const router = express.Router();

const branchController = require('../controllers/branch.controller');
const auth = require('./../middlewares/auth');

router.post('/', auth, branchController.createBranch);
router.get('/', auth, branchController.getBranches);
router.get('/:branchId', branchController.getBranch);
router.patch('/:branchId', branchController.updateBranch);
router.delete('/:branchId', branchController.deleteBranch);

module.exports = router;
