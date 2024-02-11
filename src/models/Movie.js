const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true,
        minLength: [5, 'Title should be at least 5 characters long!'],
        match: /[A-Za-z0-9\s]+/
    },
    genre: { 
        type: String, 
        required: true,
        trim: true,
        minLength: [5, 'Genre should be at least 5 characters long!'],
        match: /[A-Za-z0-9\s]+/
    },
    director: { 
        type: String, 
        required: true,
        trim: true,
        minLength: [5, 'Director name should be at least 5 characters long!'],
        match: /[A-Za-z0-9\s]+/
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2024
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
        match: /^https?:\/\//
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
        minLength: [20, 'Description should be at least 20 characters long!'],
        match: /[A-Za-z0-9\s]+/
    },
    casts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cast'
    }],
    creatorId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Movie', movieSchema);