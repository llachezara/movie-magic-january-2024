const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.auth = async function (req, res, next) {

    const token = req.cookies['user'];

    if (!token) {
        return next();
    }

    try{
        const decodedToken = await jwt.verify(token, SECRET);
        req.user = decodedToken;

        res.locals.isAuthenticated = true;

        next();
        
    }catch (error){

        console.error('JWT verification failed:', error.message);

        res.clearCookie('user');
        res.redirect('/login');
    }

}

exports.isAuth = function (req, res, next){
    if (!req.user) {
        return res.redirect('/login');
    }

    next();
}