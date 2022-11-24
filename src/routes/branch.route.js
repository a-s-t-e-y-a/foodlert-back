const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const branchController = require('../controllers/branch.controller');

router.post('/', auth, branchController.createBranch);
router.get('/', auth, branchController.getBranches);
router.get('/:branchId', auth, branchController.getBranch);
router.patch('/:branchId', auth, branchController.updateBranch);
router.delete('/:branchId', auth, branchController.deleteBranch);

module.exports = router;
