/*
    Server-fila. Bygger på rammeverket ExpressJS
    Skrevet av Mats Jørgen Engesund
*/


// Imports
var path = require('path'); 
var express = require('express'); 


/* Setter engine for prosjektet. Hvordan bruker kan se sidene */
var app = express();
app.set('view engine', 'ejs'); 
app.set('views', path.resolve(__dirname, 'views')); 


/* Henting av sidene når brukeren forespør en av de tre hovedsidene */
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/main', (req, res) => {
    res.render('main'); 
});

app.get('/registerer', (req, res) => {
    res.render('registerer');
});


// Gjør mappen public synlig, så app-en kan ta bruk av:
app.use(express.static(path.resolve(__dirname, 'public')));
//Avgjør hvilken port programmet skal "lytte" på:
app.listen(process.env.PORT || 1337);









// Imports 
/*const { text } = require('express');
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

// Registrering siden
app.get('/registerer', (req, res) => {
    res.render('registerer');
});


// Listen on port 3000 
app.listen(port, () => console.info(`Listening on port ${port}`)); */