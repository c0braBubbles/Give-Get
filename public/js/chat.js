var msg_inp = document.getElementById("mld_inp"); 
var chat_ref = firebase.database().ref().child('meldinger'); 
var form = document.getElementById("skjema"); 
var chatWindow = document.getElementById("chatVindu2"); 


/* Sender melding fra tekstfelt til DB */
form.onsubmit = function(evt) {
    evt.preventDefault();
    chat_ref.push({
        "meldingen": msg_inp.value, 
        "brukernavnet": username
    });
    msg_inp.value = "";
}


/* Mottar melding fra DB og legger til i chat */
chat_ref.on("child_added", function(snapshot) {
    var message = snapshot.val(); 
    chatWindow.innerHTML += `<div class='msg-line'><p class='sender-bubble'>${message.meldingen}</p></div>`;
});