const router = require('express').Router();
const movieService = require('../services/movieService')

router.get('/', (req, res) => {
    const movies = movieService.getAll();
    res.render('home', {title: "Catalog Page", movies})
});

router.get('/about', (req, res) => {
    res.render('about', {title: "About Page"})
});

router.get('/404', (req, res) =>{
    res.render('404')
});
module.exports = router;