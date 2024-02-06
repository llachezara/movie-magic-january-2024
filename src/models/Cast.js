const mongoose = require('mongoose');

const castSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required:true,
        min: 14,
        max: 120
    },
    born: {
        type: String,
        required: true,
        trim: true
    },
    nameInMovie: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl:{
        type: String,
        required: true,
        trim: true,
        match: /^https?:\/\//
    },

})

module.exports = mongoose.model('Cast', castSchema);