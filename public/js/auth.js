firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        // User is signed in
        document.getElementById("main-side").style.display = "block"; 
        document.getElementById("login-side").style.display = "none";

        var user = firebase.auth().currentUser; 

        if(user != null) {
            var email_id = user.email; 
            // document.getElementById("velkommen").innerHTML += "Velkommen " + email_id;
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

    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    // opprett brukeren, metoden bruker litt tid på å gjennomføre
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
    });
}


/**
 * Submit funksjon for å lagre brukernavna til brukere for enklere aksess for søk
 */

