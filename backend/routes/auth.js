const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const multer = require('../middleware/multer-config');

router.get('/refresh',authCtrl.token);
router.get('/clear',authCtrl.clear);
router.post('/signup',multer, authCtrl.signup);
router.post('/signin', authCtrl.signin);
router.post('/signout', authCtrl.signout);

module.exports = router;