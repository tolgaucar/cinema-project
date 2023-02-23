const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const path = require('path');

// Admin routes
router.get('/', (req, res) => {
    res.render('back/admin', {layout: 'back.handlebars'});
});

router.get('/movies/add', (req, res) => {
    res.render('back/addmovie', {layout: 'back.handlebars'});
})

router.post('/movies/add/process', (req, res) => {
    
    let image = req.files.image;

    image.mv(path.resolve(__dirname, '../public/img/movies/', image.name));

    Movie.create({
        ...req.body,
        image: `/img/movies/${image.name}`
    });

    res.redirect('/admin/movies/add')
})

module.exports = router;