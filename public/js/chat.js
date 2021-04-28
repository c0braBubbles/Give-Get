var msg_inp = document.getElementById("mld_inp"); 
var chat_ref = firebase.database().ref().child('meldinger'); 
var form = document.getElementById("skjema"); 

form.onsubmit = function(evt) {
    evt.preventDefault();
    chat_ref.push({
        "meldingen": msg_inp.value, 
        "brukernavnet": username
    });
    msg_inp.value = "";
}