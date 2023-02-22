const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('front/index');
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

router.get('/admin', function(req, res) {
    res.render('back/admin', {layout: 'back.handlebars'});
});

module.exports = router