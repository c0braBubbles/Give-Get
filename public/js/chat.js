var chat_ref = firebase.database().ref().child('samtaler');     // Denne sparer på samtaler mellom 2
var chat_msg = firebase.database().ref().child('meldinger');    // Denne sparer på alle meldinger
var msg_inp = document.getElementById("mld_inp");
var msg_window = document.getElementById("mld_vindu");          // trokkke denne blir brukt
var form = document.getElementById("skjema");
var chatWindow = document.getElementById("chatVindu2");

var chatListLeft = document.getElementById("chatListeVenstre");
var chatListTop = document.getElementById("chatListeTopp");

var maxChat = 0;
var currentChat = 0;



/**
 *  Tar inn brukernavnet fra annonsen som parameter
 * og re-directer brukeren til en privat chat hvor 
 * han/hun kan snakke sammen
 * @param {*} name 
 */

function startChat(name, addTittle) {
    chat_ref.on("child_added", function (snapshot) {
        var message = snapshot.val();
        maxChat = message.chatID;
        maxChat++;
    });

    active.style.display = "none";
    toggles[2].style.display = "block";

    chat_ref.push({
        "chatID": maxChat,
        "sender": username,
        "mottaker": name,
        "tittel": addTittle
    });
}



/**
 * Henter samtaler som er startet og
 * legger dem til i venstremenyen 
 * og toppmenyen
 */

chat_ref.on("child_added", function (snapshot) {
    var message = snapshot.val();

    if (message.sender === username) {
        chatListLeft.innerHTML +=   `<li class="another-chat" onclick="openChat(` + message.chatID + `)">` +
                                        `<br>` +
                                        `<h5>` + message.mottaker + `</h5>` +
                                        `<p>` + message.tittel + `</p>` + 
                                        `<br>` +
                                    `</li>`;

        // Til dropdown menyen når vinduet blir mindre (responsivt)
        chatListTop.innerHTML +=    `<li class="another-chat" onclick="openChat(`+ message.chatID + `)">  
                                        <div>
                                            <h5>` + message.mottaker + `</h5>` + 
                                            `<p>` + message.tittel + `</p>` + 
                                        `</div>
                                    </li>`
    } else if (message.mottaker === username) {
        chatListLeft.innerHTML +=   `<li class="another-chat" onclick="openChat(` + message.chatID + `)">` +
                                        `<br>` +
                                        `<h5>` + message.sender + `</h5>` +
                                        `<p>` + message.tittel + `</p>` + 
                                        `<br>` +
                                    `</li>`;

        // Til dropdown menyen når vinduet blir mindre (responsivt)
        chatListTop.innerHTML +=    `<li class="another-chat" onclick="openChat(`+ message.chatID + `)">  
                                        <div>
                                            <h5>` + message.sender + `</h5>` +
                                            `<p>` + message.tittel + `</p>` + 
                                        `</div>
                                    </li>`
    }
});



/**
 * Sende melding fra tekstfelt til DB
 * @param {*} evt 
 */

form.onsubmit = function (evt) {
    evt.preventDefault();
    chat_msg.push({
        "chatID": currentChat,
        "meldingen": msg_inp.value,
        "brukernavnet": username
    });
    msg_inp.value = "";
    openChat(currentChat);
}



/**
 * Åpner gamle meldinger fra samtaler 
 * når du trykker på en samtale du vil 
 * åpne i venstre/top-menyen
 * @param {*} number 
 */

function openChat(number) {
    chatWindow.innerHTML = ``;
    currentChat = number;
    
    chat_msg.on("child_added", function (snapshot) {
        var message = snapshot.val();
        if (message.chatID === currentChat) {
            if (username == message.brukernavnet) {
                chatWindow.innerHTML += `<div id='bobler' class='msg-line'><p class='sender-bubble'>${message.meldingen}</p></div>`;
            } else {
                chatWindow.innerHTML += `<div id='bobler' class="msg-line"><p class="receiver-bubble">${message.meldingen}</p></div>`;
            }
        }
    });
}