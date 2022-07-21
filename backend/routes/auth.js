const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const passwordCtrl = require('../middleware/passwordValidator');
const limitCtrl = require('../middleware/rateLimit');

router.get('/token', authCtrl.token);
router.post('/signup',passwordCtrl, authCtrl.signup);
router.post('/signin',limitCtrl, authCtrl.signin);
router.get('/signout',authCtrl.signout);

module.exports = router;