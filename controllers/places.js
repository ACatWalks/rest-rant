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
            res.render('places/new', {message, body});
        } else{
            res.render('error404');
        }
    });
})

//POST comments
router.post('/:id', (req, res) => {
    console.log(req.body)
    req.body.rant = req.body.rant ? true : false
    let id = Number(req.params.id)
    if(isNaN(id)){
        console.log('ID must be a number')
    }
    db.Place.findById(req.params.id).then(place => {
        db.Comment.create(req.body).then(comment => {
            place.comments.push(comment.id)
            place.save().then(() => {
                res.redirect(`/places/${req.params.id}`)
            })
        }).catch(err => {
            console.log('error 1')
            res.render('error404')
        })
    }).catch(err => {
        console.log('error 2')
        res.render('error404')
    })
})

//EDIT places
router.get('/:id/edit', (req, res) => {
    db.Place.findById(req.params.id).then(foundPlace => {
        res.render('edit', {
            place: foundPlace,
            id: req.params.id
        })
    })
})

//PUT places
router.put('/:id/edit', (req, res) => {
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
        db.Place.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(updatedPlace => {
            console.log(updatedPlace)
            res.redirect(`/places/${id}`);
        })  
    }
})

//GET /places
router.get('/:id', (req, res) => {
    db.Place.findById(req.params.id).populate('comments').then(place => {
        console.log(place)
        res.render('places/show', {place})
    }).catch(err => {
        console.log('err', err);
        res.render('error404');
    })
})

//DELETE places
router.delete('/places/:id', (req, res) => {
    db.Place.findByIdAndDelete(req.params.id).then(deletedPlace => {
        res.status(303).redirect('places')
    })
  })

//HOME route
router.get('/', (req, res) => {
    db.Place.find().then(places => {
        res.render('places/index', {places})
    }).catch(err => {
        console.log(err);
        res.render('error404');
    })
})

module.exports = router;