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