var express = require('express');
var router = express.Router();
const controller = require('../controllers/index');

router.get('/breakfast', controller.breakfast)
      .get('/brunch', controller.brunch)
      .get('/lunch', controller.lunch)
      .get('/dinner', controller.dinner)
      .get('/freshandnew', controller.freshNewRecipes)
      .get('/mostpopular', controller.mostPopularRecipes)

module.exports = router;
