const Cast = require('../models/Cast');

exports.create = async function (castData){
    return Cast.create(castData);
}