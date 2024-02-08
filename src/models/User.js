const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    }
});

userSchema.pre('svae', function (params) {
    
})
module.exports = mongoose.model('User', userSchema);