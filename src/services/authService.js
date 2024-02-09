const User = require('../models/User');

exports.register = async function (userData){
    const user = await User.create(userData);
    return user;
};
    console.log(user);
};