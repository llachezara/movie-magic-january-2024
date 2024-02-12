const Cast = require('../models/Cast');

exports.create = function (castData){
    return Cast.create(castData);
}

exports.getAll = function (){
    const casts = Cast.find();
    return casts;
}

exports.getOne = function (castId){
    const currentCast = Cast.findOne({_id: castId});
    return currentCast;
}