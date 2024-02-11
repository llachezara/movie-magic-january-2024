const mongoose = require('mongoose');

const castSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [5, "Actor's name should be at least 5 characters long!"],
        match: /[A-Za-z0-9\s]+/
    },
    age: {
        type: Number,
        required:true,
        min: 1,
        max: 120
    },
    born: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, "Birth place should be at least 10 characters long!"],
        match: /[A-Za-z0-9\s]+/
    },
    nameInMovie: {
        type: String,
        required: true,
        trim: true,
        minLength: [5, "Character's name should be at least 5 characters long!"],
        match: /[A-Za-z0-9\s]+/
    },
    imageUrl:{
        type: String,
        required: true,
        trim: true,
        match: /^https?:\/\//
    },

})

module.exports = mongoose.model('Cast', castSchema);