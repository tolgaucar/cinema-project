const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Config = require('../models/Config');
const Contact = require('../models/Contact');
const Campaign = require('../models/Campaign');


router.get('/', (req, res) => {


    Config.find({}).lean().limit(3).then(config => {
        res.locals.siteSettings = config
    });

    Movie.find({}).lean().sort({ _id: -1 }).limit(3).then(movies =>{
        Campaign.find({}).lean().limit(3).then(campaigns =>{
            res.render('front/index', {
                movies: movies,
                campaigns: campaigns
            })
        });
});

});

router.get('/hakkimizda', (req,res) =>{

    Config.find({}).lean().limit(1).then(config => {
        res.locals.siteSettings = config
        res.render('front/hakkimizda');
    });

    
})

router.get('/filmler', (req,res) =>{

    Config.find({}).lean().limit(3).then(config => {
        res.locals.siteSettings = config

        Movie.find({}).lean().sort({ _id: -1 }).limit(3).then(movies =>{
            res.render('front/filmler', {
                movies: movies,
            });
        });


    });


    
})

router.get('/iletisim', (req,res) =>{

    Config.find({}).lean().limit(3).then(config => {
        res.locals.siteSettings = config

        res.render('front/iletisim');
    });
})

router.post('/iletisim/process', (req,res) =>{

    Contact.create(req.body, (error,messages) =>{
        res.redirect('/');
    });

});


module.exports = router