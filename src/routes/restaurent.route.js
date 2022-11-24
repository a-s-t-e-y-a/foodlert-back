const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const restaurentValidation = require('../validations/restaurent.validation');
const restaurentController = require('../controllers/restaurent.controller');

const auth = require('../middlewares/auth');

router.post('/', restaurentController.createRestaurent);
router.get('/:restaurentId', auth, restaurentController.getRestaurent);
//router.patch('/:restaurentId', auth, restaurentController.updateRestaurent);
router.delete('/:restaurentId', auth, restaurentController.deleteRestaurent);

module.exports = router;
