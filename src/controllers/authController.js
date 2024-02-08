const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register', {title: "Register page"});
});

router.post('/register', async (req, res) => {
    const userData = req.body;
    await authService.register(userData);

    res.send('You are registered!');
});

module.exports = router;