const router = require('express').Router();
const castService = require('../services/castService');

router.get('/create', (req, res) =>{
    res.render('cast/create');
})

module.exports = router;