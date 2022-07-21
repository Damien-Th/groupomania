const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.get('/',auth, commentCtrl.getAllComments);
router.get('/:id',auth, commentCtrl.getOneComments);
router.get('/post/:id',auth, commentCtrl.getPostComments);
router.get('/user/:id',auth, commentCtrl.getUserComments);
router.post('/',auth, commentCtrl.createComment)
router.put('/:id',auth, commentCtrl.modifyComment);
router.delete('/:id',auth, commentCtrl.deleteComment);

module.exports = router;