const router = require('express').Router();


router.get('/movie/create', (req, res) => {
    res.render('create', {title: "Movie Create Page"})
})

router.post('/movie/create', (req, res) => {
    console.log(req.body);
    res.end();
})

module.exports = router;