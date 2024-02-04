const router = require('express').Router();
const movieService = require('../services/movieService');

router.get('/movie/create', (req, res) => {
    res.render('create', {title: "Movie Create Page"})
})

router.post('/movie/create', async (req, res) => {
    const newMovie = req.body;

    try{
        await movieService.create(newMovie);
        res.redirect('/');

    }catch(err){
        console.log(err);
        res.redirect('/movie/create');
    }

})

router.get('/movies/:movieId',(req, res)=>{
   const movieId  = req.params.movieId;
   const movie = movieService.getOne(movieId);

   //TODO: Use handlebars helpers
   movie.ratingStars = ' &#x2605;'.repeat(Number(movie.rating));

   movie ? res.render('details', {movie}) : res.redirect('/404');
})

module.exports = router;