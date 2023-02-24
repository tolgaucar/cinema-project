const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Admin = require('../models/Admin');

const path = require('path');


// Admin routes
router.get('/', (req, res) => {
    res.render('back/admin', {layout: 'back.handlebars'});
});

router.post('/login/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Admin.findOne({username}, (error,user) => {
        if(user){
            if(user.password == password){
                // Session işlemleri
                req.session.userid = user._id;
                req.session.loggedin = true;
                res.redirect('/admin/movies/add');

            }else{
                // Giriş Başarısız
            }
        }else{
            // Böyle bir admin yok

        }
    });


});

// Admins

router.get('/admins/add', (req, res) =>{

   
    if(req.session.loggedin != true){
        return res.redirect('/admin/');
    }else{
    res.render('back/addadmin', {layout: 'back.handlebars'});
    }

});

router.post('/admins/add/process', (req,res) =>{

    if(req.session.loggedin != true){
        return res.redirect('/admin/');
    }else{

    Admin.create(req.body, (error,user) =>{
        res.redirect('/admin/');
        console.log('Post işlemi yapıldı.');
    });
    }
})

// Movies 
router.get('/movies/add', (req, res) => {
    if(req.session.loggedin != true){
        return res.redirect('/admin/');
    }else{
    res.render('back/addmovie', {layout: 'back.handlebars'});
    }
    
})

router.post('/movies/add/process', (req, res) => {

    if(req.session.loggedin != true){
        res.redirect('/admin/');
    }else{
    let image = req.files.image;

    image.mv(path.resolve(__dirname, '../public/img/movies/', image.name));

    Movie.create({
        ...req.body,
        image: `/img/movies/${image.name}`
    });

    res.redirect('/admin/movies/add')
    }
    
})

module.exports = router;