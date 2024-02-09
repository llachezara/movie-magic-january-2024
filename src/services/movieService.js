const Movie = require('../models/Movie');

exports.search = function (title, genre, year){
   const query = {};

   if (title) {
     query.title = new RegExp(title, 'i');
   }
   if (genre) {
    query.genre = new RegExp(genre, 'i');;
   }
   if (year) {
     query.year = year;
   }

   return Movie.find(query);
}

exports.create = function (movieData) {
    return Movie.create(movieData);
}

exports.getAll = function (){
    const movies = Movie.find();
    return movies;
}

exports.getOne = function (movieId){
    const currentMovie = Movie.findOne({_id: movieId}).populate('casts');
    return currentMovie;
}

exports.attach = function (movieId, castId){
   return Movie.findByIdAndUpdate({_id: movieId}, { $push: { casts: castId} })
}

exports.update = function (movieId, movieData){
  const currentMovie = Movie.findByIdAndUpdate({_id: movieId}, movieData);
  return currentMovie;
}
