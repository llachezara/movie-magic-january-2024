const mongoose = require('mongoose');

exports.getErrorMessage = function (err) {
    let message = ``;
    
    if(err instanceof mongoose.MongooseError){
        console.log(Object.values(err.errors)[0].message);
        message = Object.values(err.errors)[0].message;

    }else if (err instanceof Error) {
        message = err.message;
    }

    return message;
}