class User {

    constructor() {
        this.test = "test";
        firebase.auth().onAuthStateChanged(function(user) {
            if(user) {
                // User is signed in
                document.getElementById("main-side").style.display = "block"; 
                document.getElementById("login-side").style.display = "none";
        
                var user = firebase.auth().currentUser; 
        
                if(user != null) {
                    this.email_id = user.email;
                }
            }
        
            else {
                document.getElementById("main-side").style.display = "none"; 
                document.getElementById("login-side").style.display = "block";
            }
        });
    }

}