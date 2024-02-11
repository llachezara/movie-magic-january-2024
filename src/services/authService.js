const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = async function (userData){

    const user = await User.findOne({ email: userData.email });
    
    if (user) {
        throw new Error('Email already exists!');
    }
    // try {
    //     await User.create(userData);
    // } catch (err) {
    //     if (err.code === 11000) {
    //         throw new Error('Email already exists!');
    //     }
    // }

    return User.create(userData);
};

exports.login = async function (userData){
    const {email, password} = userData;

    const user = await User.findOne({email});
    console.log(user);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log("passwordIsValid: ", passwordIsValid);

    if (!passwordIsValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        email: user.email
    }

    const token = await jwt.sign(payload, SECRET, {expiresIn: '2h'});
    return token;

}