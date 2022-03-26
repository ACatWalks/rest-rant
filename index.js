//Basic setup
require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride = require('method-override');
//My computer must have auto-added this line when I forgot to include req and res as params for my callback function because I did not write the following line
//const res = require('express/lib/response');


//Middleware
//app.set('views', _dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/places', require('./controllers/places'));

app.get('/', (req, res) => {
    res.render('home');
});

//Adding wildcard route
app.get('*', (req, res) => {
    res.render('error404');
});

//Connecting to server
app.listen(process.env.PORT);