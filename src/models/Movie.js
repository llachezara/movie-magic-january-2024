const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true 
    },
    genre: { 
        type: String, 
        required: true,
        trim: true,
        match: /^[A-Z]/
    },
    director: { 
        type: String, 
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2030
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
        match: /^https?/
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    }
})

module.exports = mongoose.model('Movie', movieSchema);