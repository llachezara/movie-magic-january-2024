const express = require('express');
const mongoose = require('mongoose');
const configExpress = require('./config/configExpress.js')
const configHandlebars= require('./config/configHandlebars.js')

const routes = require('./routes.js');

const app = express();
const PORT = 5555;

configExpress(app);
configHandlebars(app);

app.use(routes);

mongoose.connect('mongodb://localhost:27017/movies')
    .then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    })
    .catch(err => console.log('Cannot connect to DB'))
