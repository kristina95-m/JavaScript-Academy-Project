const Recipe = require('../models/recipe');




module.exports = {
    myRecipes: async (req, res) => {
        try {
          const recipes = await Recipe.find({user: req.params.id});

          res.send({
            error: false,
            message: `All recipes for user with id #${req.params.id}`,
            recipes: recipes
          });
        } catch (error) {
          res.send({
            error: true,
            message: error.message,
          });
        }
    },
    createRecipe: async (req, res) => {
        try {
           req.body.user = req.user.id;
           const recipe = await Recipe.create(req.body);

           res.status(201).send({
            error: false,
            message: `User with id #${req.body.user} has just created a new recipe!`,
            recipe: recipe
        });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
            });
        }
    },
    updateRecipe: async (req, res) => {
        try {
            req.body.user = req.user.id;
            const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);

            res.send({
                error: false,
                message: `User with id #${req.body.user} has just updated this recipe!`,
                recipe: recipe
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
            });
        }
    },
    deleteRecipe: async (req, res) => {
        try {
            req.body.user = req.user.id;
            const recipe = await Recipe.findByIdAndDelete(req.params.id);

            res.send({
                error: false,
                message: `User with id #${req.body.user} has just deleted this recipe!`,
                recipe: recipe
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
            });
        }
    },
    recipeViews: async (req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id);
            await Recipe.findByIdAndUpdate(req.params.id, {view_count: recipe.view_count + 1})
            res.send({
                error: false,
                message: 'New view',
                recipe: recipe
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
            });
        }
    }
}