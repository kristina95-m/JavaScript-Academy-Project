const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    recipe_image: {
        data: Buffer,
        contentType: String
    },
    recipe_title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    preparation_time: {
        type: String,
        required: true
    },
    number_of_people: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    recipe_description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    view_count: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('recipe', recipeSchema);