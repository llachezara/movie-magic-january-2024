const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const routes = require('./routes.js');
const app = express();
const PORT = 5555;

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));