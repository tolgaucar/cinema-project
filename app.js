const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const hostname = 'localhost';

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'views/index.html'));
});

app.listen(port, hostname, (req, res) => {
    console.log('listening on port  ' + port); 
});

