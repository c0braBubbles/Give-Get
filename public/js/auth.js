var username; 
var email_id;

// DETTE ER FUNKSJONEN SOM SJEKKER HVEM SOM HAR LOGGET INN!!!!!!!!
// function checkUser() {
firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        // User is signed in
        document.getElementById("main-side").style.display = "block";
        // document.getElementById("hjem_div").style.display = "none";
        document.getElementById("login-side").style.display = "none";

        var user = firebase.auth().currentUser; 

        if(user != null) {
            email_id = user.email; 

            setUsername(email_id);
        }
    }

    else {
        document.getElementById("main-side").style.display = "none"; 
        document.getElementById("login-side").style.display = "block";
    }
});
// } 

/**
 * Brukernavn og email_id er lagret på to forskjellige steder i db-en
 * for autensiseringens skyld. Derfor i denne metoden går vi gjennom den delen 
 * som har lagret bruker-info, og ser hvem som matcher med emailen
 * 
 * @param {*} email_id 
 */
function setUsername(email_id) {
    var ref_users = firebase.database().ref().child('bruker'); // Referanse og funksjon for når brukere blir lagt tils
    ref_users.on("child_added", function(snapshot) {
        var message = snapshot.val();
        if(email_id === message.email) {
            username = message.brukernavn;
            document.getElementById("bnavn").innerHTML = username; 
        }
    });
}














function login() {
    var emailInp = document.getElementById("email").value; 
    var passInp = document.getElementById("passord").value; 

    firebase.auth().signInWithEmailAndPassword(emailInp, passInp).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
    });
    console.log(username);
    //Logging av innlogging
    analytics.logEvent('bruker_login', { epost: emailInp })
}



/* For at funksjonen skulle funke måtte jeg omringe 
funksjonen "firebase.auth().signOut()" med try-catch */

function logout() {
    firebase.auth().signOut().then(() => {
        // trenger ingenting her
    }).catch((error) => {
        alert(error); // mest sannsynlig vil ingen error forekomme
    });
}



function signUp() {

    var email      = document.getElementById('inputEmail').value;
    var password   = document.getElementById('inputPassword').value;


    var brukerInfo = {
        fornavn: document.getElementById('inputFirstname').value,
        etternavn: document.getElementById('inputLastname').value,
        email: document.getElementById('inputEmail').value,
        brukernavn: document.getElementById('inputUsername').value
    }

    
    // opprett brukeren, metoden bruker litt tid på å gjennomføre
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
        firebase.database().ref('Bruker').push(brukerInfo); // Lagrer resterende brukerdata i databasen
        window.location = "main";
    });
}



function signUp() {
    
    var email      = document.getElementById('inputEmail').value;
    var password   = document.getElementById('inputPassword').value;
    var brukernavn = document.getElementById('inputUsername').value;
    
    // opprett brukeren, metoden bruker litt tid på å gjennomføre
    auth.createUserWithEmailAndPassword(email, password).then(cred => { //Oppretter brukeren i auth her
        firebase.database().ref('bruker').child(brukernavn).set({       //Legger inn resterende bruker info
            fornavn:    document.getElementById('inputFirstname').value,
            etternavn:  document.getElementById('inputLastname').value,
            email:      email,
            brukernavn: document.getElementById('inputUsername').value
        }).then(() => {                                                 //Går til slutt til main-siden når det over er ferdig
            window.location = "main";            
        });
    });
}


/**
 * Submit funksjon for å lagre brukernavna til brukere for enklere aksess for søk
 */
