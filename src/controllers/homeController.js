const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {title: "Catalog Page"})
});

router.get('/about', (req, res) => {
    res.render('about', {title: "About Page"})
});

router.get('/404', (req, res) =>{
    res.render('404')
});
module.exports = router;