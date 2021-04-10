/* 
    JavaScript fil med diverse funksjoner for den dynamiske opplevelsen
    Inneholder funksjoner for å manøvrere seg inni brukergrensesnittet
*/

/* Slideshowet på index.html */
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


/* Navigasjon */
var toggles = [
    document.getElementById("hjem_div"),
    document.getElementById("sok_div"), 
    document.getElementById("melding_div"),
    document.getElementById("profil_div")
];

var ids = [
    "hjem",
    "sok",
    "melding", 
    "bruker"
];

var active = toggles[0]; 

function navigate(clicked_id) {
    for(let i = 0; i < toggles.length; i++) {
        if(clicked_id === ids[i]) {
            active.style.display = "none"; 
            toggles[i].style.display = "block";
            active = toggles[i];
        }
    }
}



/**
 * Javascript kode for kartet på hjem-skjermen 
 * Variabel 'map' er selve kartet som blir lagt til i 'kart-diven' (home.ejs)
 * Linker fra maptiler.com blir så lagt til som et lag (layer) på kartet
 * Variabel 'marker' er bare en test-markør for å demonstrere hvordan ting kan bli 
 * ... lagt til på kartet med lengdegrad og breddegrad 
 */

 var map = L.map('map').setView([0, 0], 1); 
 L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=GM1I0Cr9B2EDW1eBIoYl', {
     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
 }).addTo(map); 
 //var marker = L.marker([51.5, -0.09]).addTo(map); // Testmarkør plassert i London



/**
 * Henter info innhold fra databasen, som kan bli brukt til å søkes etter
 * Innholdet blir lagt til i en HTML liste (ul)
 */

var ul = document.getElementById("liste");

// Referanse og funksjon til når annonser blir lagt til
var ref_ads = firebase.database().ref().child('Annonse');
ref_ads.on("child_added", function(snapshot) {
    var message = snapshot.val();
    ul.innerHTML += `<li><a href='#'>${message.tittel}</a></li>`; 
    var marker2 = L.marker([message.latitude, message.longitude]).addTo(map);
    marker2.onclick = function() {
        alert("her bor mats");
    }
});

// Referanse og funksjon for når brukere blir lagt til
var ref_users = firebase.database().ref().child('bruker'); 
ref_users.on("child_added", function(snapshot) {
    var message = snapshot.val(); 
    ul.innerHTML += `<li><a href='#'>${message.brukernavn}</a></li>`;
})


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