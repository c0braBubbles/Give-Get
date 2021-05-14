var username; 
var email_id;
var firstname;
var lastname;
var brukerID;

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
            firstname = message.fornavn;
            lastname = message.etternavn;
            brukerID = snapshot.key;
            document.getElementById("bnavn").innerHTML = username;
            document.getElementById("editUsername").value = username;
            document.getElementById("editFirstname").value = firstname;
            document.getElementById("editLastname").value = lastname;
            //document.getElementById("editEmail").value = message.email;
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


/*
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
}*/



function signUp() {
    
    var email      = document.getElementById('inputEmail').value;
    var password   = document.getElementById('inputPassword').value;
    var brukernavn = document.getElementById('inputUsername').value;
    var userID = Date.now();
    
    // opprett brukeren, metoden bruker litt tid på å gjennomføre
    if ( document.getElementById('inputPassword2').value !== password ) {
        window.alert("Gjenta passord stemmer ikke med passordet du har skrevet inn!")
    } else if ( password.length < 6 ) {
        window.alert("Passordet er for kort!")
    } else if (document.getElementById('inputFirstname').value.length == 0 || document.getElementById('inputLastname').value.length == 0 ||
               email.length == 0 || brukernavn.length == 0) {
        window.alert("Vennligst fyll inn alle feltene")
    } else {
        auth.createUserWithEmailAndPassword(email, password).then(cred => { //Oppretter brukeren i auth her
            firebase.database().ref('bruker').child(userID).set({       //Legger inn resterende bruker info child(brukernavn)
                fornavn:    document.getElementById('inputFirstname').value,
                etternavn:  document.getElementById('inputLastname').value,
                email:      email,
                brukernavn: brukernavn
            }).then(() => {                                                 //Går til slutt til main-siden når det over er ferdig
                window.location = "main";            
            });
        });
    }
}
/*
function lastOppDritt() {
    var usernameG = document.getElementById('editUsername').value;
    var firstnameG = document.getElementById('editFirstname').value;
    var lastnameG = document.getElementById('editLastname').value;
    var emailG = document.getElementById('editEmail').value;
    firebase.database().ref('bruker/'+brukerID).update({
        brukernavn : usernameG,
        fornavn : firstnameG,
        etternavn : lastnameG
        //email : emailG
        //email : emailG  !NB denne venter vi litt med, fordi det krever litt mere å oppdatere email
    }).then(() => {
        username = usernameG;
        firstname = firstnameG;
        lastname = lastnameG;
        //email_id = emailG;
        document.getElementById('bnavn').innerHTML = username;
        var userG = firebase.auth().currentUser;
        userG.updateEmail(emailG).then(function() {
            firebase.database().ref('bruker/'+brukerID).update({
                email : emailG
            });
            //Update successful
            email_id = emailG;
            exitEditing(); //Lukker vinduet for å redigere profilen
        }).catch(function(error) {
            //Error
        });
        
    });
}*/

/*
 * Metoden har flere steg
 * 1. henter verdiene fra input-feltene
 * 2. oppdaterer email-adressen
 * 3. oppdaterer bruker-tabellen
 * 4. setter variablene i js-filen til de nye bruker-verdiene, og krysser ut edit-vinduet 
 */
function lastOppDritt() {
    var f_username = document.getElementById('editUsername').value;
    var f_firstname = document.getElementById('editFirstname').value;
    var f_lastname = document.getElementById('editLastname').value;
    var testmail = document.getElementById("editEmail").value;
    //var testmail = "detteerentest@hotmail.com";
    var fuser = firebase.auth().currentUser;
    fuser.updateEmail(testmail).then(function() { 

        firebase.database().ref("bruker/"+brukerID).update({
            brukernavn : f_username,
            fornavn : f_firstname,
            etternavn : f_lastname,
            email : testmail 
        }).then(() => {
            username = f_username;
            firstname = f_firstname;
            lastname = f_lastname;
            email_id = testmail;
            document.getElementById('bnavn').innerHTML = username; //Denne er bare for å oppdatere navnet som står på profil-siden
            exitEditing();
        });

    }).catch(function(error) {
        //Error
    });
}


/**
 * Submit funksjon for å lagre brukernavna til brukere for enklere aksess for søk
 */
