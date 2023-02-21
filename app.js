const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;
const hostname = 'localhost';

app.use(express.static('public'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('frontend/index');
});

app.get('/hakkimizda', (req,res) =>{
    res.render('frontend/hakkimizda');
})

app.get('/filmler', (req,res) =>{
    res.render('frontend/filmler');
})

app.get('/iletisim', (req,res) =>{
    res.render('frontend/iletisim');
})




app.listen(port, hostname, (req, res) => {
    console.log('listening on port  ' + port); 
});

