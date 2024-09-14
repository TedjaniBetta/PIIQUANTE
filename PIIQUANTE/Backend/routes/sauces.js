const express = require ('express');
const router = express.Router();
const saucesControllers = require ('../controllers/saucesController');
const multer = require ('../middlewear/multer');
const auth = require ('../middlewear/auth');
const likeController = require('../controllers/likeController');

router.post ('/', auth, multer, saucesControllers.createSauce);
router.get('/:id',auth,  saucesControllers.getOneSauce);
router.get('/', auth, saucesControllers.getAllSauces);
router.put('/:id', auth, multer, saucesControllers.modifySauce);
router.delete('/:id', auth, saucesControllers.deleteSauce);
router.post('/:id/like', auth, likeController.like)


module.exports = router;