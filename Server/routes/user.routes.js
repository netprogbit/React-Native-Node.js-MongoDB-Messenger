const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/user.controller');
const router = express.Router();
const passport = require('passport');
const auth = passport.authenticate('jwt', {session: false});

router.post('/users', auth, asyncHandler(controller.getUsers));

module.exports = router;