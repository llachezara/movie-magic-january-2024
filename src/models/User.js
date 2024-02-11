const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: [true, 'You have already registered!'],
        trim: true,
        validate: [
            function (value) {
                return validator.isEmail(value)
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
                return validator.isAlphanumeric(value)
            }, 
            `Password must consist only of letters and digits!`
        ],
        minLength: [6, 'Password should be at least 6 characters long!']
    }
});

userSchema.virtual('rePassword')
    .set(function(value) {
        
        if (value !== this.password) {
             throw new mongoose.MongooseError('Password mismatch!')
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
})

module.exports = mongoose.model('User', userSchema);