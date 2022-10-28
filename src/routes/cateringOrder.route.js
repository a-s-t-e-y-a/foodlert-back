const express = require('express');
const router = express.Router();

const cateringOrderController = require('../controllers/cateringOrder.controller');

// orders
router.post('/', cateringOrderController.createCateringOrder);
router.get('/', cateringOrderController.getAllCateringOrder);
router.get('/:id', cateringOrderController.getCateringOrder);
router.patch('/:id', cateringOrderController.updateCateringOrder);
router.delete('/:id', cateringOrderController.deleteCateringOrder);

module.exports = router;
