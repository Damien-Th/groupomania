const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.post('/',multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.get('/user/:id', postCtrl.getUserPosts);
router.get('/:id', postCtrl.getOnePost);
router.put('/text/:id', postCtrl.modifyPostText);
router.put('/image/:id',multer, postCtrl.modifyPostImage);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;