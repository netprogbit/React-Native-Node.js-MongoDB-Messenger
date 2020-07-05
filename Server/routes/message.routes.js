const express = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/message.controller');
const router = express.Router();
const passport = require('passport');
const auth = passport.authenticate('jwt', {session: false});

router.post('/message', auth, asyncHandler(controller.addMessage));
router.post('/messages', auth, asyncHandler(controller.getMessages));

module.exports = router;