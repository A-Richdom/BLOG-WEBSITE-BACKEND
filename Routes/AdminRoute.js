const express = require('express')
const {handleSignUp, handleLogin, getUser, handleForgotPassword} = require('../Controllers/AdminController');
const { verifyToken } = require('../Middlewares/VerifyUser');
require('dotenv').config();


const router = express.Router();

router.post('/signup', handleSignUp)
router.post('/login', handleLogin)
router.get('/getUser', verifyToken, getUser)
router.post('/forgotPassword', handleForgotPassword)




module.exports = router

