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
