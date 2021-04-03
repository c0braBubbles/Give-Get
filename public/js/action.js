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

var id = [
    "hjem",
    "sok",
    "melding", 
    "bruker"
];

var active = toggles[0]; 

function navigate(clicked_id) {
    for(let i = 0; i < toggles.length; i++) {
        if(clicked_id === id[i]) {
            active.style.display = "none"; 
            toggles[i].style.display = "block";
            active = toggles[i];
        }
    }
}


/**
 * Henter info innhold fra databasen, som kan bli brukt til å søkes etter
 * Innholdet blir lagt til i en HTML liste (ul)
 */

var ul = document.getElementById("liste");
var chat = firebase.database().ref().child('Annonse');
chat.on("child_added", function(snapshot) {
    var message = snapshot.val();
    ul.innerHTML += `<li><a href='#'>${message.tittel}</a></li>`; 
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