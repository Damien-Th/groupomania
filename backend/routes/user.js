const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getAllUsers);
router.get('/last', userCtrl.getLastUser); 
router.put('/active/:id', userCtrl.makeAdmin); 
router.get('/slug', userCtrl.getAllUsersSlug); 
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;

