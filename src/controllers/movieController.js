const router = require('express').Router();

router.get('/movie/create', (req, res) => {
    res.render('create', {title: "Movie Create Page"})
})

module.exports = router;