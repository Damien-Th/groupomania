const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/',auth, postCtrl.getAllPosts);
router.get('/user/:id',auth, postCtrl.getUserPosts);
router.get('/:id',auth, postCtrl.getOnePost);
router.post('/',auth, multer, postCtrl.createPost);
router.put('/text/:id',auth, postCtrl.modifyPostText);
router.put('/image/:id',auth, multer, postCtrl.modifyPostImage);
router.delete('/:id',auth, postCtrl.deletePost);

module.exports = router;