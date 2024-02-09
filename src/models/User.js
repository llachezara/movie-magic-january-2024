const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8
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