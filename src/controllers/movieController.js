const router = require('express').Router();
const movieService = require('../services/movieService')

router.get('/movie/create', (req, res) => {
    res.render('create', {title: "Movie Create Page"})
})

router.post('/movie/create', (req, res) => {
    const newMovie = req.body;
    movieService.create(newMovie);
    
    const movies = movieService.getAll();
    res.redirect('/')
})

module.exports = router;