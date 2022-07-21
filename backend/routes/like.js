const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

router.get('/post/:id',auth, likeCtrl.postLike);
router.get('/comment/:id',auth, likeCtrl.commentLike);
router.post('/',auth, likeCtrl.handleLike);

module.exports = router;