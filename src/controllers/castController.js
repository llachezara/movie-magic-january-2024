const router = require('express').Router();
const castService = require('../services/castService');
const {isAuth} = require('../middlewares/authMiddleware');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/create', isAuth, (req, res) =>{
    res.render('cast/create', {pageTitle: "Create Cast"});
})

router.post('/create', async (req, res) =>{
    const cast = req.body;

    try{
        await castService.create(cast);
        res.redirect('/');
    }catch(err){
       const message = getErrorMessage(err);
       res.render('cast/create', {pageTitle: "Create Cast", ...cast, error: message})
    }

})

module.exports = router;