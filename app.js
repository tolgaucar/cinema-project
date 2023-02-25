const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;
const hostname = 'localhost';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


main().catch(err => console.log(err));

async function main() {
  await mongoose.set("strictQuery", false);
  await mongoose.connect('mongodb://localhost:27017/test');
}

// express-session
app.use(session({
  secret: 'githubtolgaucar',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// middleware for sessions
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});


app.use(fileUpload());
app.use(express.static('public'));




app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const adminRoutes = require('./routes/admin');
const mainRoutes = require('./routes/main');
const Admin = require('./models/Admin');

app.use('/', mainRoutes);
app.use('/admin', adminRoutes);


app.listen(port, hostname, (req, res) => {
    console.log('listening on port  ' + port); 
});

