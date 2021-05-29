var username; 
var email_id;
var firstname;
var lastname;
var brukerID;



/**
 * Dette er en funksjon som settes i verk når du laster inn nettsiden. 
 * Den sjekker hvem som er logget inn. Skjelettet til denne funksjonen 
 * er hentet fra firebase sine hjemmesider og blitt modfisisert til 
 * mer relevans for vårt bruk. Som hva som skjer når en bruker er logget inn,
 * og når ikke, som er å hente partials (div-er som er låst før man er logget inn), 
 * og sette lokal variabel 'email_id' lik den man logget inn med
 * 
 * Skrevet av Mats Jørgen Engesund
 */

firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        // User is signed in
        document.getElementById("main-side").style.display = "block";
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



/**
 * Brukernavn og email_id er lagret på to forskjellige steder i db-en
 * for autensiseringens skyld. Derfor i denne metoden går vi gjennom den delen 
 * som har lagret bruker-info, og ser hvem som matcher med emailen
 * 
 * Skrevet av Mats Jørgen Engesund og Jacob Kristensen
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
            document.getElementById("editEmail").value = message.email;
            firebase.storage().ref("users/"+brukerID+"/profile.jpg").getDownloadURL().then(imgURL => {
                document.getElementById("redigerProfilBilde").src = imgURL;
                document.getElementById("minProfilBilde").src = imgURL;
            });
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
    //Logging av innlogging - Christoffer
    analytics.logEvent('bruker_login', { epost: emailInp })
}



/**
 * Logut funksjon. Blir aktivert når du trykker på knappen øverst i 
 * venstre på nav-baren. 
 * For at funksjonen skulle funke måtte jeg omringe 
 * funksjonen "firebase.auth().signOut()" med try-catch
 * 
 * Skrevet av Mats Jørgen Engesund
 */
function logout() {
    firebase.auth().signOut().then(() => {
        // trenger ingenting her
    }).catch((error) => {
        alert(error); // mest sannsynlig vil ingen error forekomme
    });
}



/* 
 * Registrering av ny bruker funksjon. Funksjonen blir aktivert
 * Når en trykker på knappen "registrer" bruker på registrering-siden
 * 1. Funksjonen henter info som er i de forskjellige input-feltene
 * 2. Sjekker om infoen fylt ut (riktig)
 * 3.1. Info er feil -> send en passende alert til brukeren
 * 3.2. Info er riktig -> Opprett en bruker, login info lagres i Auth
 *        Resterende info lagres i realtime databasen, deretter sendes brukeren til main-siden
 * 
 *  Skrevet av Jacob Kristensen
 * 
 */
function signUp() {
    
    var email      = document.getElementById('inputEmail').value;
    var password   = document.getElementById('inputPassword').value;
    var brukernavn = document.getElementById('inputUsername').value;
    var userID;
    
    if ( document.getElementById('inputPassword2').value !== password ) {
        window.alert("Gjenta passord stemmer ikke med passordet du har skrevet inn!")
    } else if ( password.length < 6 ) {
        window.alert("Passordet er for kort!")
    } else if (document.getElementById('inputFirstname').value.length == 0 || document.getElementById('inputLastname').value.length == 0 ||
               email.length == 0 || brukernavn.length == 0) {
        window.alert("Vennligst fyll inn alle feltene")
    } else {
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            userID = firebase.auth().currentUser.uid; 
            firebase.database().ref('bruker').child(userID).set({
                fornavn:    document.getElementById('inputFirstname').value,
                etternavn:  document.getElementById('inputLastname').value,
                email:      email.toLowerCase(), 
                brukernavn: brukernavn
            }).then(() => {                                          
                window.location = "main";
            });
        });
    }                            
}


/*
 * Metoden er for å endre på brukerinformasjon og har flere steg
 * Metoden blir aktivert når bruker trykker på knappen for å lagre endringer i profil-siden
 * 1. henter verdiene fra input-feltene
 * 2. oppdaterer email-adressen
 * 3. oppdaterer bruker-tabellen i realtime databasen (den resterende infoen)
 * 4. setter variablene i js-filen til de nye bruker-verdiene, i tillegg til verdien til et element på profil-siden
 * 5. Krysser ut edit-vinduet, ved hjelp av en funksjon 
 * 
 * Skrevet av Jacob Kristensen, utenom der annet navn er kommentert
 * 
 */
function saveUserChanges() {
    var f_username = document.getElementById('editUsername').value;
    var f_firstname = document.getElementById('editFirstname').value;
    var f_lastname = document.getElementById('editLastname').value;
    var f_mail = document.getElementById("editEmail").value;
    var fuser = firebase.auth().currentUser;

    fuser.updateEmail(f_mail).then(function() { 

        firebase.database().ref("bruker/"+brukerID).update({
            brukernavn : f_username,
            fornavn : f_firstname,
            etternavn : f_lastname,
            email : f_mail.toLowerCase()
        }).then(() => {
            username = f_username;
            firstname = f_firstname;
            lastname = f_lastname;
            email_id = f_mail.toLowerCase();
            document.getElementById('bnavn').innerHTML = username;
            exitEditing();
        });
           //Logging av Redigerte profiler - Christoffer
           analytics.logEvent('brukerinfo_redigert', {
            epost: f_mail,
            brukernavn: f_username,
            fornavn: f_firstname,
            etternavn: f_lastname
          });

    }).catch(function(error) {
        //Error
    }).then(() => {
        firebase.database().ref('samtale').once('value', (snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                for (let i in data) {
                    if (data[i].interessertID === brukerID) {
                        firebase.database().ref('samtale/'+data[i].samtaleID).update({
                            annonseInteressert : f_username
                        });
                    } else if (data[i].eierID === brukerID) {
                        firebase.database().ref('samtale/'+data[i].samtaleID).update({
                            annonseEier : f_username
                        });
                    }
                }
            }
        });
    });
}

/*
 * Funksjonen brukes for å slette bruker
 * og aktiveres når noen først trykker på knappen "Slett bruker" på profil-siden
 * Videre får bruker en popup, hvor en kan bekrefte at en vil slette bruker, eller kansellere
 * Dersom bruker bekrefter, slettes først bruker-info i realtime databasen, derretter mulig tilhørende bilde
 * og til slutt auth-info(login info til bruker)
 * 
 * Skrevet av Jacob Kristensen
 * 
 */ 
function deleteUser() {
    var fuser = firebase.auth().currentUser;
    var svar = confirm("Du er i ferd med å slette brukeren din! \r\n Trykk [OK] for å fortsette");

    if (svar) {
        
        firebase.database().ref("bruker/"+brukerID).remove().then(() => {
            firebase.storage().ref("users/"+brukerID+"/profile.jpg").delete().then(() => {
                //Fil slettet
            }).catch((error) => {
                console.log("Ingen fil tilhørende brukeren");
            }).then(() => {
                fuser.delete().then(function() {
                    //bruker slettet
                }).catch(function(error) {
                    //error med å slette bruker
                });
            });
        });
    }
}


var fil = {};

/*
 * Denne funksjonen henter filstien til en bilde, slik at brukeren kan laste opp bildet
 * Metoden er funnet på nettet, mer info om kilden kan sees i kildehenvisningen
 */
function velgFil(e) {
    fil = e.target.files[0];
}

/*
 * Funksjon for å endre/laste opp profilbilde
 * Funksjonen starter med at filen hentes og lastes opp i storage
 * Videre henter vi igjen url'en til bildet fra firebase Storage, og endrer på image-elementer sin src,
 * slik at det nye profilbildet vises for brukeren
 * Hjelp til metoden funnet på nettet, mer info om kilden kan sees i kildehenvisningen
 * 
 * Skrevet av Jacob Kristensen
 * 
 */
function changeProfilePicture() {
    firebase.storage().ref("users/"+brukerID+"/profile.jpg").put(fil).then(function () {
        console.log("Fil lastet opp i Storage");
    }).catch(error => {
        console.log(error.message);
    }).then(() => {
        firebase.storage().ref("users/"+brukerID+"/profile.jpg").getDownloadURL().then(imgURL => {
            document.getElementById("redigerProfilBilde").src = imgURL;
            document.getElementById("minProfilBilde").src = imgURL;
        });
    });
}