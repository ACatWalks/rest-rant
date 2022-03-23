const router = require('express').Router();
const db = require('../models');
const places = require('../models/places.js');

//New route
router.get('/new', (req, res) => {
    res.render('places/new');
})

//POST /places
router.post('/', (req, res) => {
    db.Place.create(req.body).then(() => {
        res.redirect('/places');
    }).catch(err => {
        if(err && err.name == 'ValidationError'){
            let message = 'Validation Error: This year is either in the future or WAY too far in the past'
            res.render('places/new', { message, body });
        } else{
            res.render('error404');
        }
    });
})

//EDIT places
/*router.get('/:id/edit', (req, res) => {
    let id = Number(req.params.id);
    if(isNaN(id)){
        res.render('error404');
    } else if(!places[id]){
        res.render('error404');
    } else{
        res.render('places/edit', { place: places[id], id });
    }
})*/

//PUT places
/*router.put('/:id/edit', (req, res) => {
    let id = Number(req.params.id);
    if(isNaN(id)){
        res.render('error404');
    } else if(!places[id]){
        res.render('error404');
    } else{
        if(!req.body.pic){
            req.body.pic = 'http://placekitten.com/400/400'
        }
        if(!req.body.city){
            req.body.city = 'Anytown'
        }
        if(!req.body.state){
            req.body.state = 'USA'
        }
        places[id] = req.body;
        res.redirect(`/places/${id}`);
    }
})*/

//GET /places
router.get('/:id', (req, res) => {
    db.Place.findById(req.params.id).populate('comments').then(place => {
        console.log(place.comments)
        res.render('places/show', { place })
    }).catch(err => {
        console.log('err', err);
        res.render('error404');
    })
})

//DELETE places
/*router.delete('/places/:id', (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {
      res.render('error404')
    }
    else if (!places[id]) {
      res.render('error404')
    }
    else {
      places.splice(id, 1)
      res.redirect('/places')
    }
  })*/

//HOME route
router.get('/', (req, res) => {
    db.Place.find().then(places => {
        res.render('places/index', { places })
    }).catch(err => {
        console.log(err);
        res.render('error404');
    })
})

module.exports = router;