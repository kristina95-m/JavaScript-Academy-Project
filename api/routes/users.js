var express = require('express');
var router = express.Router();
const jwt = require('express-jwt');
require('dotenv').config();


const controller = require('../controllers/users');

router.post('/register', controller.userRegister)
      .post('/login', controller.userLogin)
      .get('/myprofile', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.myProfile)
      .put('/edit', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.editMyProfile)
      .post('/logout', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.userLogout)

module.exports = router;
