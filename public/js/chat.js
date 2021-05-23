/*
 * JavaScript fil for all funksjonalitet som har med chat-delen 
 * av applikasjonen å gjøre
 * 
 * Script skrevet av Mats Jørgen Engesund, utenom der det eventuelt er markert i koden
 */



// Mange variabler som blir brukt flere steder gjennom hele fila. 
var chat_ref = firebase.database().ref().child('samtaler');     // Denne sparer på samtaler mellom 2
var chat_msg = firebase.database().ref().child('meldinger');    // Denne sparer på alle meldinger
var msg_inp = document.getElementById("mld_inp");               // Melding-input-felt
var msg_window = document.getElementById("mld_vindu");          // trokkke denne blir brukt
var form = document.getElementById("skjema");                   // Form som er rundt hele meldingsvinduet
var chatWindow = document.getElementById("chatVindu2");         // Hvor meldingsboblene dukker opp

var chatListLeft = document.getElementById("chatListeVenstre"); // Listen med alle samtaler
var chatListTop = document.getElementById("chatListeTopp");     // Når vinduet blir minimert skal samtaler dukke opp i denne div-en

var maxChat = 0;        // Max antall samtaler totalt
var currentChat = 0;    // Samtalen du for øyeblikket er på.



/**
 * Tar inn brukernavnet fra annonsen som parameter
 * og re-directer brukeren til en privat chat hvor 
 * han/hun kan snakke sammen
 * 
 * @param {navnet til den man vil prate med} name 
 * @param {annonsetittel} addTittle 
 */

function startChat(name, addTittle) {
    // henter siste chat lagt til og øker med 1
    chat_ref.on("child_added", function (snapshot) {
        var message = snapshot.val();
        maxChat = message.chatID;
        maxChat++;
    });

    active.style.display = "none";
    toggles[2].style.display = "block";

    // Sender informasjon om samtale til DB
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

function sendMld() {
form.onsubmit = function (evt) {
    //Logging av chat - Christoffer
    analytics.logEvent('melding_sendt', {
        melding: msg_inp.value,
        sender: username,
    })
    evt.preventDefault();
    chat_msg.push({
        "chatID": currentChat,
        "meldingen": msg_inp.value,
        "brukernavnet": username
    });
    msg_inp.value = "";
    openChat(currentChat);
}
console.log("kjører");
}



/**
 * Åpner gamle meldinger fra samtaler 
 * når du trykker på en samtale du vil 
 * åpne i venstre/top-menyen
 * @param {*} number 
 */

function openChat(number) {
    // chatWindow.innerHTML = ``;
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



function getData() {
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