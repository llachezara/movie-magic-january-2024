const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail, isAlphanumeric} = require('validator');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: [true, 'You have already registered!'],
        trim: true,
        validate: [
            function (value) {
                return isEmail(value)
            }, 
            `Invalid email address!`
        ],
        minLength: [10, `Email must be at least 10 characters long!`]
    },
    password:{
        type: String,
        required: true,
        validate: [
            function (value) {
                return isAlphanumeric(value)
            }, 
            `Password must consist only of letters and digits!`
        ],
        minLength: [6, 'Password should be at least 6 characters long!']
    }
});

userSchema.virtual('rePassword')
    .set(function(value) {
        
        if (value !== this.password) {
             throw new Error('Password mismatch!')
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
})

module.exports = mongoose.model('User', userSchema);