const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {title: "Catalog Page"})
});

module.exports = router;