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

// DETTE SKAL BLI EN PARTIAL ETTERHVERT
app.get('/annonser', (req, res) => {
    res.render('annonser');
}); 

// PROBLEMER MED DENNE. SPØR JACOB ELLER CHRIS
// DETTE SKAL VÆRE BLI EN PARTIAL ETTERHVERT
app.get('/editprofile', (req, res) => {
    res.render('editprofile');
});

app.get('/innstillinger', (req, res) => {
    res.render('innstillinger'); 
});

app.get('/login', (req, res) => {
    res.render('login'); 
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

// DENNE KAN VÆRE MULIG VI DROPPER
app.get('/registerer', (req, res) => {
    res.render('registerer');
});


// Listen on port 3000 
app.listen(port, () => console.info(`Listening on port ${port}`)); 