var chat_ref = firebase.database().ref().child('meldinger');
var msg_inp = document.getElementById("mld_inp");  
var msg_window = document.getElementById("mld_vindu");
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
    currentChat++; 

    active.style.display = "none";
    toggles[2].style.display = "block";
    
    chat_ref.push({
        "chatID": currentChat, 
        "Mottaker": name, 
        "Sender": username
    });
}



function openChat(number) {
    console.log("Før: " + currentChat);
    currentChat = number;
    console.log("Etter: " + currentChat);

    msg_window.style.display = "none"; 
    msg_window.style.display = "block";

    chat_ref.on("child_added", function(snapshot) {
        var message = snapshot.val(); 
        
        if(message.chatID === currentChat) {
            if(username == message.brukernavnet) {
                chatWindow.innerHTML += `<div class='msg-line'><p class='sender-bubble'>${message.meldingen}</p></div>`;
            }else {
                chatWindow.innerHTML += `<div class="msg-line"><p class="receiver-bubble">${message.meldingen}</p></div>`;
            }
        }
    });
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
    
    if(message.Sender === username) {
        chatListLeft.innerHTML +=   `<li class="another-chat" onclick="openChat(` + message.chatID + `)">` + 
                                        `<br>` + 
                                        `<h5>` + message.Mottaker + `</h5>` +
                                        `<br>` +   
                                    `</li>`;
    } else if(message.Mottaker === username) {
        chatListLeft.innerHTML +=   `<li class="another-chat" onclick="openChat(` + message.chatID + `)">` + 
                                        `<br>` + 
                                        `<h5>` + message.Sender + `</h5>` +
                                        `<br>` +   
                                    `</li>`;
    }
    
    /*if(username === message.brukernavnet) {
        chatWindow.innerHTML += `<div class='msg-line'><p class='sender-bubble'>${message.meldingen}</p></div>`;
    }
    else {
        chatWindow.innerHTML += `<div class="msg-line"><p class="receiver-bubble">${message.meldingen}</p></div>`;
    }*/
});