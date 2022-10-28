const express = require('express');
const router = express.Router();

const inventoryOrderController = require('../controllers/inventoryOrder.controller');

router.post('/register', inventoryOrderController.createInventoryOrder);
router.get('/transfered', inventoryOrderController.getAllInventoryOrder);
router.get('/transfered/:id', inventoryOrderController.getInventoryOrder);
router.patch('/status/:id', inventoryOrderController.updateInventoryOrder);
router.delete('/delete/:id', inventoryOrderController.deleteInventoryOrder);

module.exports = router;
