const router = require('express').Router();
const castService = require('../services/castService');

router.get('/create', (req, res) =>{
    res.render('cast/create', {title: "Create Cast"});
})

router.post('/create', async (req, res) =>{
    const cast = req.body;
    try{
        await castService.create(cast);
        res.redirect('/');
    }catch(err){
        console.log(err);
    }

})

module.exports = router;