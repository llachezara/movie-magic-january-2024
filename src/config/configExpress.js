const express = require('express');
const path = require('path');

function configExpress(app){
    app.use(express.static(path.join(__dirname, '../static')));
    app.use(express.urlencoded({extended: false}));

    return app;
}

module.exports = configExpress;