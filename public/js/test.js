/**
 * Dette er en testfil jeg lagde for å teste det hele greiene med å
 * fecthe brukernavnet. Denne skal selvfølgelig bli slettet etterhvert. 
 */


var profileTag = document.getElementById("bnavn"); 
profileTag.innerHTML = username; 


var btn_test = document.getElementById("test_btn").onclick = function() {
    alert(username);
}