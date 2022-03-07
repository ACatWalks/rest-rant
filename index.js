//Basic setup
require('dotenv').config();
const express = require('express');
//const res = require('express/lib/response');
const app = express();
app.use('/places', require('./controllers/places'));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Adding wildcard route
app.get('*', (req, res) => {
    res.status(404).send('<h1>404 Page</h1>')
});

//Connecting to server
app.listen(process.env.PORT);