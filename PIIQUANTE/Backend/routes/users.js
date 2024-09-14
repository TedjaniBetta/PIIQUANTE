const express = require ('express');
const router = express.Router();
const usersController = require('../controllers/usersController')

router.post('/signup', usersController.signup)
router.post('/login', usersController.login)
router.post('/', usersController.createUsers)
router.get('/', usersController.getusers)
router.get('/users', usersController.getOneUsers)
router.get('/', usersController.getAllUsers);

module.exports = router;