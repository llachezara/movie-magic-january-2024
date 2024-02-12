const router = require('express').Router();
const movieService = require('../services/movieService')

router.get('/', async (req, res) => {
    const movies = await movieService.getAll().lean();
    res.render('home', {pageTitle: "Catalog Page", movies})
});

router.get('/about', (req, res) => {
    res.render('about', {pageTitle: "About Page"})
});

router.get('/search', async (req, res) => {
    const params = req.query;
    const {title, genre, year} = params;

    try{
        const movies = await movieService.search(title, genre, year).lean();
        res.render('search', {pageTitle: "Search Page", movies, params})
    }catch(err){
        console.log(err);
    }

});

router.get('/404', (req, res) =>{
    res.render('404')
});
module.exports = router;