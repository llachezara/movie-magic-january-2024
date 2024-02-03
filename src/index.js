const express = require('express');

const configExpress = require('./config/configExpress.js')
const configHandlebars= require('./config/configHandlebars.js')
const bodyParser = require('body-parser');

const routes = require('./routes.js');

const app = express();
const PORT = 5555;

app.use(bodyParser.urlencoded({ extended: true }));
configExpress(app);
configHandlebars(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));