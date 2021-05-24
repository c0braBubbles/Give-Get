/*
 * JavaScript fil med diverse funksjoner for den dynamiske opplevelsen.
 * Inneholder funksjoner for å manøvrere seg inni brukergrensesnittet, 
 * få opp kart, få annonser på kart og søk. Nøyere beskrivelser over
 * hver metode. 
 * 
 * Script skrevet av Mats Jørgen Engesund, utenom der det eventuelt er markert i koden
 */






/** Slideshowet på index.ejs */
const navSlide = () => {
    const burger = document.querySelector('.burger'); 
    const nav = document.querySelector('.nav-links'); 
    const navLinks = document.querySelector('.nav-links li'); 

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active'); 
        navLinks.forEach((link, testnav) => {
            if(link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${testnav / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    })
}



/** DOM-objekter som refererer til partials */
var toggles = [
    document.getElementById("hjem_div"),
    document.getElementById("sok_div"), 
    document.getElementById("melding_div"),
    document.getElementById("profil_div")
];

/** 
 * ID-er til hvilken side du er på. 
 * Matcher ID-en til knappene på nav-baren
 */
var ids = [
    "hjem",
    "sok",
    "melding", 
    "bruker"
];


/** Aktiv-side (den du er på) satt til 'hjem' av default etter man logger inn */
var active = toggles[0]; 


/**
 * Funksjon navigate er til å navigere rundt på 
 * nettsiden. Tar inn ID-en til knappen du trykket på 
 * og sjekker opp med listen 'ids'. Setter så den som 
 * matcher tilhørende side ved bruk av DOM-lista 'toggles'
 * 
 * @param {*} clicked_id 
 */

function navigate(clicked_id) {
    for(let i = 0; i < toggles.length; i++) {
        if(clicked_id === ids[i]) {
            active.style.display = "none"; 
            toggles[i].style.display = "block";
            active = toggles[i];
        }
    }
}




/*
 * Javascript kode for kartet på hjem-skjermen 
 * Variabel 'map' er selve kartet som blir lagt til i 'kart-diven' (home.ejs)
 * Linker fra maptiler.com blir så lagt til som et lag (layer) på kartet
 * Variabel 'marker' er bare en test-markør for å demonstrere hvordan ting kan bli 
 * lagt til på kartet med lengdegrad og breddegrad 
 */

var map = L.map('map').setView([0, 0], 1); 
L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=GM1I0Cr9B2EDW1eBIoYl', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map); 
//var marker = L.marker([51.5, -0.09]).addTo(map); // Testmarkør plassert i London



/*
 * Funksjoner som konstant skjer (realtime) hver gang annonse blir lagt ut. 
 * Hva som skjer her er at hver gang en annonse blir lagt ut så vil det legges
 * til i søke-lista og markør på kartet
 */
var ul = document.getElementById("liste");                  // DOM-ref. til listen på søk-side
var ref_ads = firebase.database().ref().child('Annonse');   // Referanse til 'tabell' i DB
ref_ads.on("child_added", function(snapshot) {              // Funksjon for hver gang noe blir lagt til i DB starter her
    var message = snapshot.val();
    ul.innerHTML += `<li><a href='#'>${message.tittel}</a></li>`; //Legger til i liste for søk, så man kan søke etter anonser og

    // Legger til annonse på markør, som så blir lagt til på kartet.

    // farge på markøren (leaflet)
    var blueMarker = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var redMarker = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });


    if(message.kategori === "Etterspørsel") {
        var marker2 = L.marker([message.latitude, message.longitude], {icon: blueMarker}).addTo(map).bindPopup(
            `<div class ="text-center" width="560" height="315"` + 
                `<h2>` + message.tittel + `</h2>` + 
                `<p>` + message.beskrivelse + `</p>` + 
                `<p class="font-italic">` + message.brukernavn + `</p>` + 
                `<button type="button" class="btn btn-primary btn-default btn-circle">` + 
                    `<i class="fa fa-comment" onclick="lagSamtale('` + message.brukernavn + `', '` + message.tittel +`', '` + snapshot.key + `')"></i>` + //'` + message.brukernavn + `', '` + message.tittel +`', '` + message.id + `'
                `</button>` + 
            `</div>`, {
                maxWidth: 560
        }).openPopup();
    } 
    else if(message.kategori === "Tilbud") {
        var marker2 = L.marker([message.latitude, message.longitude], {icon: redMarker}).addTo(map).bindPopup(
            `<div class ="text-center" width="560" height="315"` + 
                `<h2>` + message.tittel + `</h2>` + 
                `<p>` + message.beskrivelse + `</p>` + 
                `<p class="font-italic">` + message.brukernavn + `</p>` + 
                `<button type="button" class="btn btn-primary btn-danger btn-circle">` + 
                    `<i class="fa fa-comment" onclick="lagSamtale('` + message.brukernavn + `', '` + message.tittel +`', '` + snapshot.key + `')"></i>` + //'` + message.brukernavn + `', '` + message.tittel + `'
                `</button>` + 
            `</div>`, {
                maxWidth: 560
        }).openPopup();
    }
});



/*
 * Referanse og funksjon for når brukere blir lagt til
 * og legger til i liste for søk
 */
 var ref_users = firebase.database().ref().child('bruker'); 
 ref_users.on("child_added", function(snapshot) {
    var message = snapshot.val(); 
    ul.innerHTML += `<li><a href='#'>${message.brukernavn}</a></li>`;
 });



/**
 * Funksjon for søking
 * Når innhold blir hentet fra databasen blir det usynlig helt til 
 * funksjonen trer i kraft og filtrerer lista og sjekker kompatibelhet med
 * inndatafeltet
 */

function searching() {
    var input, filter, li, a, i, txtValue; 
    input = document.getElementById("sokeBar"); 
    filter = input.value.toUpperCase();
    li = ul.getElementsByTagName("li"); 

    for(i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0]; 
        txtValue = a.textContent || a.innerText; 

        if(txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
        } else {
            li[i].style.display = "";
        }
    }
}