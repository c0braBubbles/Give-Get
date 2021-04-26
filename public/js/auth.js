firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        // User is signed in
        document.getElementById("main-side").style.display = "block"; 
        document.getElementById("login-side").style.display = "none";

        var user = firebase.auth().currentUser; 

        if(user != null) {
            var email_id = user.email;
            return email_id;
        }
    }

    else {
        document.getElementById("main-side").style.display = "none"; 
        document.getElementById("login-side").style.display = "block";
    }
});



function login() {
    var emailInp = document.getElementById("email").value; 
    var passInp = document.getElementById("passord").value; 

    firebase.auth().signInWithEmailAndPassword(emailInp, passInp).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
    });
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

