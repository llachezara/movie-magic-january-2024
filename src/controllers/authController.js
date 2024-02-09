const router = require('express').Router();
const authService = require('../services/authService');
const {isAuth} = require('../middlewares/authMiddleware');

router.get('/register', (req, res) => {
    res.render('auth/register', {title: "Register page"});
});

router.post('/register', async (req, res) => {
    const userData = req.body;
    await authService.register(userData);

    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('auth/login', {title: "Login page"});
});

router.post('/login', async (req, res) => {
    const userData = req.body;
    const token = await authService.login(userData);

    res.cookie('user', token);
    res.redirect('/');
});

router.get('/logout', isAuth, (req, res) =>{
    res.clearCookie('user');
    res.redirect('/');
})
module.exports = router;