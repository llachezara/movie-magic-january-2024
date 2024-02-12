const mongoose = require('mongoose');

exports.getErrorMessage = function (err) {
    let message = ``;
    
    if(err instanceof mongoose.MongooseError){
        console.log('----------------MONGOOSE MONGOOSE ERROR-----------------');

        if (err.name == "CastError") {
            message = `Invalid ${err.path.toUpperCase()}: ${err.value}.`
        }else{
            console.log(Object.values(err.errors)[0].message);
            message = Object.values(err.errors)[0].message;
        }


    }else if (err instanceof Error) {
        console.log('----------------ERROR-----------------');
        message = err.message;
    }

    return message;
}