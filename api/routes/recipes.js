var express = require('express');
var router = express.Router();
const controller = require('../controllers/recipes');
const jwt = require('express-jwt');
require('dotenv').config();

router.get('/users/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.myRecipes)
      .post('/', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.createRecipe)
      .put('/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.updateRecipe)
      .delete('/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.deleteRecipe)
      .patch('/:id', controller.recipeViews)
      
      

module.exports = router;