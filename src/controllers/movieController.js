const router = require('express').Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');
const {isAuth} = require('../middlewares/authMiddleware');

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
        console.log(err);
        res.redirect('/movie/create');
    }

})

router.get('/movies/:movieId/', async (req, res)=>{
   const movieId  = req.params.movieId;

   try{
        let movie = await movieService.getOne(movieId).lean();
        const isOwner = req.user && movie.creatorId == req.user?._id;
        console.log("ISOWNER: ", isOwner);

        //TODO: Use handlebars helpers
        movie.ratingStars = ' &#x2605;'.repeat(Number(movie.rating));

        movie ? res.render('movie/details', {title: "Movie Details", movie, isOwner}) : res.redirect('/404');
   }catch(err){
        console.log(err);
   }

})

router.get('/movies/:movieId/attach', isAuth, async (req, res)=>{
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId).lean();

    const casts = await castService.getAll().lean();
    console.log(casts);
    res.render('movie/attach-cast', {title: "Attach Cast", movie, casts})
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
    const movie = await movieService.getOne(movieId).lean();

    res.render('movie/edit', {title: "Edit page", movie});
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