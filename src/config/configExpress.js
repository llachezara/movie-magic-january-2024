const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

function configExpress(app){
    app.use(express.static(path.join(__dirname, '../static')));
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());

    return app;
}

module.exports = configExpress;