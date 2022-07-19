const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.get('/token', authCtrl.token);
router.post('/signup', authCtrl.signup);
router.post('/signin', authCtrl.signin);
router.get('/signout', authCtrl.signout);

module.exports = router;