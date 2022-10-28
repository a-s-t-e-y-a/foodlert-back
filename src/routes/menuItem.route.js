const express = require('express');
const router = express.Router();

const menuItemController = require('../controllers/menuItem.controller');

router.post('/', menuItemController.createMenuItem);
router.get('/', menuItemController.getAllMenuItem);
router.get('/:id', menuItemController.getMenuItem);
router.patch('/:id', menuItemController.updateMenuItem);
router.delete('/:id', menuItemController.deleteMenuItem);

module.exports = router;
