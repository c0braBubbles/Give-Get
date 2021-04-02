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


/* Funksjon for søking: */
function searching() {
    var input, filter, ul, li, a, i, txtValue; 
    input = document.getElementById("sokBar");
    filter = input.value.toUpperCase(); 
    ul = document.getElementById("liste"); 
    li = document.getElementsByTagName("li"); 
    
    for(i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText; 
        if(txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = ""; 
        } else {
            li[i].style.display = "none";
        }
    }
}