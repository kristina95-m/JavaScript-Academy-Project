const Recipe = require('../models/recipe');
const User = require('../models/user');

module.exports = {
    breakfast: async (req, res) => {
        try {
            const recipes = await Recipe.find({category: 'breakfast'});

            res.send({
                error: false,
                message: 'Recipes for breakfast',
                recipes: recipes
              });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
              });
        }
    },
    brunch: async (req, res) => {
        try {
            const recipes = await Recipe.find({category: 'brunch'});

            res.send({
                error: false,
                message: 'Recipes for brunch',
                recipes: recipes
              });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
              });
        }
    },
    lunch: async (req, res) => {
        try {
            const recipes = await Recipe.find({category: 'lunch'});

            res.send({
                error: false,
                message: 'Recipes for lunch',
                recipes: recipes
              });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
              });
        }
    },
    dinner: async (req, res) => {
        try {
            const recipes = await Recipe.find({category: 'dinner'});

            res.send({
                error: false,
                message: 'Recipes for dinner',
                recipes: recipes
              });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
              });
        }
    },
    freshNewRecipes: async (req, res) => {
        try {
            const lastAddedRecipes = 3;
            const freshNew = await Recipe.find({}).sort({createdAt: -1}).limit(lastAddedRecipes);

            res.send({
                error: false,
                message: 'List of new recipes',
                freshNew: freshNew
              });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
              });
        }
    },
    mostPopularRecipes: async (req, res) => {
        try {
            const mostViewedRecipes = 6;
            const mostPopular = await Recipe.find({}).sort({view_count: -1}).limit(mostViewedRecipes);

            res.send({
                error: false,
                message: 'List of new recipes',
                mostPopular: mostPopular
              });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
              });
        }
    }
}