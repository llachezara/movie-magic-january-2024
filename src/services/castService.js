const Cast = require('../models/Cast');

exports.create = function (castData){
    return Cast.create(castData);
}

exports.getAll = function (){
    const casts = Cast.find();
    return casts;
}