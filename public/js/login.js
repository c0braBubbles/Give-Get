var firebaseConfig = {
    apiKey: "AIzaSyChkMk9qNYQPiY6CrtSf5BvSdRDJHSk3w4",
    authDomain: "giveget-73d6d.firebaseapp.com",
    databaseURL: "https://giveget-73d6d-default-rtdb.firebaseio.com",
    projectId: "giveget-73d6d",
    storageBucket: "giveget-73d6d.appspot.com",
    messagingSenderId: "283451874495",
    appId: "1:283451874495:web:84f01359274a699715ba0a",
    measurementId: "G-0MT991669E"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


function signUp() {
    var email = document.getElementById("email");  
    var password = document.getElementById("passord");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value); 
    promise.catch(e => alert(e.message));

    alert("Signed Up"); 
}


function signIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("passord"); 

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    //alert("Signed in as " + email);
    window.location = "/annonser";
}

function signOut() {
    auth.signOut();
    alert("Signed out");
}