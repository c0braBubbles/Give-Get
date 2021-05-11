var msg_inp = document.getElementById("mld_inp"); 
var chat_ref = firebase.database().ref().child('meldinger'); 
var form = document.getElementById("skjema"); 
var chatWindow = document.getElementById("chatVindu2"); 

var chatListLeft = document.getElementById("chatListeVenstre"); 
var chatListTop = document.getElementById("chatListeTopp");

var currentChat = 0;


/**
 * Tar inn brukernavnet fra annonsen som parameter
 * og re-directer brukeren til en privat chat hvor 
 * han/hun kan snakke sammen
 * @param {*} name
 */

function startChat(name) {

}



/**
 * Sende melding fra tekstfelt til DB
 * @param {*} evt 
 */

form.onsubmit = function(evt) {
    evt.preventDefault();
    chat_ref.push({
        "chatID": currentChat,
        "meldingen": msg_inp.value, 
        "brukernavnet": username
    });
    msg_inp.value = "";
}



/**
 * Mottar melding fra DB 
 * og legger til i chat
 */

chat_ref.on("child_added", function(snapshot) {
    var message = snapshot.val(); 
    
    currentChat = message.chatID;

    if(username === message.brukernavnet) {
        chatWindow.innerHTML += `<div class='msg-line'><p class='sender-bubble'>${message.meldingen}</p></div>`;
    }
    else {
        chatWindow.innerHTML += `<div class="msg-line"><p class="receiver-bubble">${message.meldingen}</p></div>`;
    }
});