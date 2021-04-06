// Imports 
const { text } = require('express');
const express = require('express'); 
const app = express(); 
const port = 3000; 


// Static files 
app.use(express.static('public')); 
app.use('/css', express.static(__dirname + 'public/css')); 
app.use('/js', express.static(__dirname + 'public/js')); 
app.use('/img', express.static(__dirname + 'public/img')); 

app.set('views', './views'); 
app.set('view engine', 'ejs'); 

app.get('', (req, res) => {
    res.render('index', {text: 'This is ejs'});
});
 
app.get('/other', (req, res) => {
    res.render('other', {text: 'other pages'});
});

app.get('/header', (req, res) => {
    res.render('header'); 
}); 

app.get('/testest', (req, res) => {
    res.render('testest'); 
}); 


// Listen on port 3000 
app.listen(port, () => console.info(`Listening on port ${port}`)); 