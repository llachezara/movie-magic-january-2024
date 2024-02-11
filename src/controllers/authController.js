const router = require('express').Router();
const authService = require('../services/authService');
const {isAuth} = require('../middlewares/authMiddleware');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/register', (req, res) => {
    res.render('auth/register', {title: "Register page"});
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    try{
        await authService.register(userData);
        res.redirect('/login');
    }catch (err){
        const message = getErrorMessage(err);
        res.status(400).render('auth/register', {title: "Register page", error: message, ...userData})
    }    

});

router.get('/login', (req, res) => {
    res.render('auth/login', {title: "Login page"});
});

router.post('/login', async (req, res) => {
    const userData = req.body;
    try{
        const token = await authService.login(userData);
       
        res.cookie('user', token);
        res.redirect('/');
    }catch (err){
        const message = getErrorMessage(err);
        res.status(400).render('auth/login', {title: "Login page", error: message, ...userData})
    }    

});

router.get('/logout', isAuth, (req, res) =>{
    res.clearCookie('user');
    res.redirect('/');
})
module.exports = router;