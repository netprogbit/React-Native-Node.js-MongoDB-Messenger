const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));

module.exports = router;