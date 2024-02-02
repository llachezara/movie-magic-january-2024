const express = require('express');

const configExpress = require('./config/configExpress.js')
const configHandlebars= require('./config/configHandlebars.js')
const routes = require('./routes.js');

const app = express();
const PORT = 5555;

configExpress(app);
configHandlebars(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));