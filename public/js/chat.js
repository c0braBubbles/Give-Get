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
/*
function startChat(name, addTittle) {
    // henter siste chat lagt til og øker med 1
    chat_ref.on("child_added", function (snapshot) {
        var message = snapshot.val();
        maxChat = message.chatID;
        maxChat++;
    });
    // Sender bruker chat-siden
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
*/
//lagSamtale - Aktiveres når en trykker på chat-symbolet på en annonse
function lagSamtale(name, addTitle) {
    var samtaleID = Date.now();
    firebase.database().ref('samtaleTest').child(samtaleID).set({
        annonseEier : name,
        annonseInteressert : username,
        annonseTittel : addTitle
    }).then(() => {
        active.style.display = "none";
        toggles[2].style.display = "block";
    });
}
//loadSamtale - Lager det visuelle, altså boksene på venstre, når det blir opprettet en ny samtale i firebase
  //Når et nytt child blir lagt til i samtaleTest, gjør det under. Message inneholder alle verdiene i det nye child'et
firebase.database().ref('samtaleTest').on("child_added", function (snapshot) {
    var message = snapshot.val();

    if (message.annonseInteressert === username) {  //Dersom du er den som tar kontakt
        chatListLeft.innerHTML +=  `<li class="another-chat" onclick="testOpenChat(` + snapshot.key + `)">` + //NB! Husk å lage egen metode, istedet for openChat
                                        `<br>` +
                                        `<h5>` + message.annonseEier + `</h5>` +
                                        `<p>` + message.annonseTittel + `</p>` + 
                                        `<br>` +
                                   `</li>`;
        chatListTop.innerHTML +=    `<li class="another-chat" onclick="testOpenChat(`+ snapshot.key + `)">  
                                        <div>
                                            <h5>` + message.annonseEier + `</h5>` + 
                                            `<p>` + message.annonseTittel + `</p>` + 
                                        `</div>
                                    </li>`
    } else if (message.annonseEier === username) {
        chatListLeft.innerHTML +=  `<li class="another-chat" onclick="testOpenChat(` + snapshot.key + `)">` + //NB! Husk å lage egen metode, istedet for openChat
                                        `<br>` +
                                        `<h5>` + message.annonseInteressert + `</h5>` +
                                        `<p>` + message.annonseTittel + `</p>` + 
                                        `<br>` +
                                   `</li>`;
        chatListTop.innerHTML +=    `<li class="another-chat" onclick="testOpenChat(`+ snapshot.key + `)">  
                                        <div>
                                            <h5>` + message.annonseInteressert + `</h5>` + 
                                            `<p>` + message.annonseTittel + `</p>` + 
                                        `</div>
                                    </li>`
    }
});
//hentGamleMeldinger - aktiveres når en trykker på en samtale
var testsamtaleID;
function testOpenChat(samtaleNr) {
    chatWindow.innerHTML = ``; // Fjerner alle meldinger, og så skal meldingene hentes på ny
    testsamtaleID = samtaleNr;

    firebase.database().ref("testMeldinger/").once('value', (snapshot) => { //Usikker på denne metoden, må finne ut mer om det her
        var data = snapshot.val();
        for (let i in data) { //Går gjennom hele tabellen
            if (data[i].samtaleNr === samtaleNr) { //Dersom en melding sitt samtalenr er lik 
                if (username === data[i].sender) { //Sjekker om meldingen er sendt av deg eller ikke, gir riktig styling på boblen ut ifra det
                    chatWindow.innerHTML += `<div id='bobler' class='msg-line'><p class='sender-bubble'>${data[i].beskjeden}</p></div>`;
                } else {
                    chatWindow.innerHTML += `<div id='bobler' class="msg-line"><p class="receiver-bubble">${data[i].beskjeden}</p></div>`;
                }
            }
        }
    })
}

//sendMelding
form.onsubmit = function (evt) {
    evt.preventDefault();
    var testmeldingID = Date.now();
    firebase.database().ref("testMeldinger").child(testmeldingID).set({
        samtaleNr : testsamtaleID,
        beskjeden : msg_inp.value,
        sender : username
    });
    msg_inp.value = ""; // Når du sender noe, fjern teksten fra input
}

//hentNyeMeldinger
firebase.database().ref("testMeldinger").on("child_added", function (snapshot) {
    var data = snapshot.val();
    //Sjekker om meldingen ble sendt til nåværende samtale(testsamtaleID og data.samtaleNr)
    if (data.samtaleNr == testsamtaleID) {
        // sant - er sender deg, eller er sender en annen, er det deg, sett riktig boble osv
        if (data.sender == username) {
            chatWindow.innerHTML += `<div id='bobler' class='msg-line'><p class='sender-bubble'>${data.beskjeden}</p></div>`;
        } else {
            chatWindow.innerHTML += `<div id='bobler' class="msg-line"><p class="receiver-bubble">${data.beskjeden}</p></div>`;
        }
    }
    
});


/**
 * Henter samtaler som er startet og
 * legger dem til i venstremenyen 
 * og toppmenyen
 */
/*
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
*/


/**
 * Sende melding fra tekstfelt til DB
 * @param {*} evt 
 */
/*
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
*/



/**
 * Åpner gamle meldinger fra samtaler 
 * når du trykker på en samtale du vil 
 * åpne i venstre/top-menyen
 * @param {*} number 
 */
/*
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
*/
