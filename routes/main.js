const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Campaign = require('../models/Campaign');


router.get('/', (req, res) => {

    Movie.find({}).lean().limit(3).then(movies =>{
        Campaign.find({}).lean().limit(3).then(campaigns =>{
            res.render('front/index', {
                movies: movies,
                campaigns: campaigns
            })
        });
    });

});

router.get('/hakkimizda', (req,res) =>{
    res.render('front/hakkimizda');
})

router.get('/filmler', (req,res) =>{
    res.render('front/filmler');
})

router.get('/iletisim', (req,res) =>{
    res.render('front/iletisim');
})




module.exports = router