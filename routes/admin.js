const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Admin routes
router.get('/', (req, res) => {
    res.render('back/admin', {layout: 'back.handlebars'});
});

router.get('/movies/add', (req, res) => {
    res.render('back/addmovie', {layout: 'back.handlebars'});
})

router.post('/movies/add/process', (req, res) => {
    Movie.create(req.body);
})

module.exports = router;