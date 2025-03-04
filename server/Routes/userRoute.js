const express =require('express');
const {Auth, Admin}= require('../Middle-ware/auth');
const userController= require('../controllers/userController');
const router =express.Router();

router.post('/signup', userController.createUser);
router.post('/login' , userController.loginUser);
module.exports =router;