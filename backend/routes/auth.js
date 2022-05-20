const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.post('/signup',authCtrl.signup);
router.post('/signin', authCtrl.signin);
router.post('/signout', authCtrl.signout);


module.exports = router;