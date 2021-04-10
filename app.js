// Imports 
const { text } = require('express');
const express = require('express'); 
const app = express(); 
const port = 3000; 


// Static files 
// Initierer bruk av mappene
app.use(express.static('public')); 
app.use('/css', express.static(__dirname + 'public/css')); 
app.use('/js', express.static(__dirname + 'public/js')); 
app.use('/img', express.static(__dirname + 'public/img')); 


// Setter enginge for views. Hvordan lese filene
app.set('views', './views'); 
app.set('view engine', 'ejs'); 


// Requester alle sidene
// Denne er index/landing-siden
app.get('', (req, res) => {
    res.render('', {text: 'This is ejs'});
});
 
// HovedSiden
app.get('/main', (req, res) => {
    res.render('main');
});

app.get('/registerer', (req, res) => {
    res.render('registerer');
});

// Test
app.get('/popupTest', (req, res) => {
    res.render('popupTest');
})


// Listen on port 3000 
app.listen(port, () => console.info(`Listening on port ${port}`)); 