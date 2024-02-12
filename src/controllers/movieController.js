const router = require('express').Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');
const {isAuth} = require('../middlewares/authMiddleware');
const {getErrorMessage} = require('../utils/errorUtils');
const mongoose = require('mongoose');

router.get('/movie/create', isAuth, (req, res) => {
    res.render('movie/create', {title: "Movie Create Page"})
})

router.post('/movie/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    newMovie.creatorId = req.user._id;
    console.log(newMovie);

    try{
        await movieService.create(newMovie);
        console.log('Successfully created a new Movie!');
        res.redirect('/');

    }catch(err){
        //TODO: Populate values with only correct prvovided data
        const message = getErrorMessage(err);
        res.render('movie/create',  {title: "Movie Create Page", error: message, ...newMovie});
    }

})

router.get('/movies/:movieId/', async (req, res)=>{
   const movieId  = req.params.movieId;

   try{
        let movie = await movieService.getOne(movieId);

        if (movie) {
           const populatedMovie = await movieService.getOne(movieId).lean();
           movie = populatedMovie;

        }else {
            throw new Error('Movie does not exist!');
        }


        const isOwner = req.user && movie.creatorId == req.user?._id;
        console.log("IS OWNER: ", isOwner);

        //TODO: Use handlebars helpers
        movie.ratingStars = ' &#x2605;'.repeat(Number(movie.rating));

        res.render('movie/details', {title: "Movie Details", movie, isOwner});
   }catch (err) {

        console.log("LOG ERR MESSAGE: ", err.message);
        console.log("LOG ERR: ", err);
        const message = getErrorMessage(err);
        res.status(400).render('404', {error:message});
   }

})

router.get('/movies/:movieId/attach', isAuth, async (req, res)=>{
    const movieId = req.params.movieId;

    try{
        let movie = await movieService.getOne(movieId);

        if (movie) {
           const populatedMovie = await movieService.getOne(movieId).lean();
           movie = populatedMovie;
        }else {
            throw new Error('Movie does not exist!');
        }

        const casts = await castService.getAll().lean();
        console.log(casts);
        res.render('movie/attach-cast', {title: "Attach Cast", movie, casts})
   }catch (err) {

        console.log("LOG ERR MESSAGE: ", err.message);
        console.log("LOG ERR: ", err);
        const message = getErrorMessage(err);
        res.status(400).render('404', {error:message});
   }


    //TODO: Show only casts that are not attached to the movie

})

router.post('/movies/:movieId/attach', isAuth, async (req, res)=>{
    const movieId = req.params.movieId;
    const castId = req.body.castId;

    try{
        await movieService.attach(movieId, castId);
        res.redirect(`/movies/${movieId}`);
    }catch(err){
        console.log(err);
    }
})

router.get('/movies/:movieId/edit', isAuth, async (req, res) =>{
    const movieId = req.params.movieId;
    
    try{
        let movie = await movieService.getOne(movieId);

        if (movie) {
           const populatedMovie = await movieService.getOne(movieId).lean();
           movie = populatedMovie;
        }else {
            throw new Error('Movie does not exist!');
        }

        res.render('movie/edit', {title: "Edit page", movie});
   }catch (err) {

        console.log("LOG ERR MESSAGE: ", err.message);
        console.log("LOG ERR: ", err);
        const message = getErrorMessage(err);
        res.status(400).render('404', {error:message});
   }
   
})

router.post('/movies/:movieId/edit', isAuth, async (req, res) =>{
    const movieId = req.params.movieId;
    const movieData = req.body;
    
    await movieService.update(movieId, movieData);

    res.redirect(`/movies/${movieId}/`);
})

router.get('/movies/:movieId/delete', isAuth, async (req, res) =>{
    const movieId = req.params.movieId;
    
    await movieService.delete(movieId);

    res.redirect(`/`);
})

module.exports = router;