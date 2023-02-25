const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Config = require('../models/Config');
const Admin = require('../models/Admin');
const Campaign = require('../models/Campaign');
const Contact = require('../models/Contact');
const path = require('path');


// Admin routes
router.get('/', (req, res) => {
    res.render('back/admin', {layout: 'back.handlebars'});
});

router.get('/panel',    (req, res) => {
    res.render('back/panel', {layout: 'back.handlebars'});
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

                res.redirect('/admin/panel/');
                
            }else{
                // Giriş Başarısız
            }
        }else{
            // Böyle bir admin yok

        }
    });


});

router.get('/logout', (req,res) =>{
    req.session.destroy(() =>{
        res.redirect('/admin');
    });
});

// Contacts

router.get('/contacts', (req,res) =>{

    if(req.session.loggedin != true){
        return res.redirect('/admin/');
    }else{
        Contact.find({}).lean().then(messages => {
            res.render('back/contacts', {
                messages: messages,
                layout: 'back.handlebars'});

            console.log(messages);
        })
    }

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

        req.session.sessionFlash = {
            exist: true
        };


    Admin.create(req.body, (error,user) =>{
        res.redirect('/admin/panel/');
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

    req.session.sessionFlash = {
        exist: true
    };

    res.redirect('/admin/panel/');
    }
    
})


// Campaigns

router.get('/campaigns/add', (req, res) => {
    if(req.session.loggedin != true){
        return res.redirect('/admin/');
    }else{
    res.render('back/addcampaign', {layout: 'back.handlebars'});
    }
    
})

router.post('/campaigns/add/process', (req,res) =>{

    if(req.session.loggedin != true){
        return res.redirect('/admin/');
    }else{

        req.session.sessionFlash = {
            exist: true
        };

    Campaign.create(req.body, (error,user) =>{
        res.redirect('/admin/panel/');
    });
    }
})

// Settings

router.get('/settings/edit', (req, res) =>{
    if(req.session.loggedin != true){
        return res.redirect('/admin/');
    }else{

        Config.find({_id: '63f9e3be3dee2166a24cfa46'}).lean().limit(1).then(config =>{
            
            res.render('back/editSettings', {
                config: config,
                layout: 'back.handlebars'
            })

        });

    }
});

router.post('/settings/edit/process', (req,res) =>{

    if(req.session.loggedin != true){
        return res.redirect('/admin/');
    }else{

        req.session.sessionFlash = {
            exist: true
        };

    Config.findByIdAndUpdate({_id: '63f9e3be3dee2166a24cfa46'}, req.body, (err, config) => {
        res.redirect('/admin/panel/');
    });
    }
})

module.exports = router;
