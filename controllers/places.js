const router = require('express').Router();
const db = require('../models');
const places = require('../models/places.js');

//HOME route
router.get('/', (req, res) => {
    db.Place.find().then(places => {
        res.render('places/index', {places})
    }).catch(err => {
        console.log(err);
        res.render('error404');
    })
})

//POST /places
router.post('/', (req, res) => {
    if(!req.body.city){
        req.body.city = 'Anytown'
    }
    if(!req.body.state){
        req.body.state = 'USA'
    }
    if(!req.body.pic){
        req.body.pic = 'http://placekitten.com/350/350'
    }
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

//New route
router.get('/new', (req, res) => {
    res.render('places/new');
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

//PUT places
router.put('/:id/edit', (req, res) => {
    if(!req.body.pic){
        req.body.pic = 'http://placekitten.com/400/400'
    }
    if(!req.body.city){
        req.body.city = 'Anytown'
    }
    if(!req.body.state){
        req.body.state = 'USA'
    }
    db.Place.findByIdAndUpdate(req.params.id, req.body).then(() => {
        res.redirect(`/places/${req.params.id}`);
    }).catch(err => {
        console.log('err', err)
        res.render('error404')
    })  
})



//DELETE places
router.delete('/places/:id', (req, res) => {
db.Place.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/places')
}).catch(err => {
    console.log(err)
    res.render('error404')
})
})

//EDIT places
router.get('/:id/edit', (req, res) => {
    console.log(req.params.id)
    db.Place.findById(req.params.id).then(foundPlace => {
        res.render('places/edit', {place: foundPlace})
    }).catch(err => {
        console.log(err)
        console.log('Caught in edit route')
        res.render('error404')
    })
})

//POST comments
router.post('/:id', (req, res) => {
    console.log(req.body)
    if(req.body.author === '') {req.body.author = undefined}
    req.body.rant = req.body.rant ? true : false
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

//DELETE comments
router.delete('/:id/comment/:commentId', (req, res) => {
    db.Comment.findByIdAndDelete(req.params.commentId).then(() => {
        console.log('Success!')
        res.redirect(`/places/${req.params.id}`)
    }).catch(err => {
        console.log(err)
        res.render('error404')
    })
})

module.exports = router;