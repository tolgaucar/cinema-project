const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;
const hostname = 'localhost';
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.set("strictQuery", false);
  await mongoose.connect('mongodb://localhost:27017/test');
}


app.use(express.static('public'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('front/index');
});

app.get('/hakkimizda', (req,res) =>{
    res.render('front/hakkimizda');
})

app.get('/filmler', (req,res) =>{
    res.render('front/filmler');
})

app.get('/iletisim', (req,res) =>{
    res.render('front/iletisim');
})

app.get('/admin', function(req, res) {
    res.render('back/admin', {layout: 'back.handlebars'});
});


app.listen(port, hostname, (req, res) => {
    console.log('listening on port  ' + port); 
});

