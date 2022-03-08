//Basic setup
require('dotenv').config();
const express = require('express');
//My computer must have auto-added this line when I forgot to include req and res as params for my callback function because I did not write the following line
//const res = require('express/lib/response');
const app = express();

//Middleware
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine())

app.use('/places', require('./controllers/places'));

app.get('/', (req, res) => {
    res.render('home');
});

//Adding wildcard route
app.get('*', (req, res) => {
    res.status(404).send('<h1>404 Page</h1>')
});

//Connecting to server
app.listen(process.env.PORT);