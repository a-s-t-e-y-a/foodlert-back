const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOtp);
router.post('/verify-token', authController.verifyToken);
router.post("/logout",auth,authController.logout)
module.exports = router;
