/*
 * JavaScript fil for all funksjonalitet som har med chat-delen 
 * av applikasjonen å gjøre
 * 
 * Skrevet av Jacob Kristensen og Mats Engesund
 */



// Mange variabler som blir brukt flere steder gjennom hele fila. 
var msg_inp = document.getElementById("mld_inp");               // Melding-input-felt
var form = document.getElementById("skjema");                   // Form som er rundt hele meldingsvinduet
var chatWindow = document.getElementById("chatVindu2");         // Hvor meldingsboblene dukker opp
var chatListLeft = document.getElementById("chatListeVenstre"); // Listen med alle samtaler
var chatListTop = document.getElementById("chatListeTopp");     // Når vinduet blir minimert skal samtaler dukke opp i denne div-en



/**
 * Tar inn brukernavn, annonseID og annonsetittel fra en annonse
 * som inn-parameter. Funksjonen kalles på når en trykker på "chat-bobla" til en annonse
 * på kartet. Funksjonen har ansvar for å opprette "samtale" i realtime-databasen, men sjekker først:
 *   1. Har brukeren en allerede-eksisterende samtale til denne annonsen?
 *   2. Er det eieren av annonsen som prøver å opprette en samtale med seg selv?
 * Dersom ingen av de to stemmer -> Opprett en samtale i realtime-databasen
 * 
 * @param {navnet til den man vil prate med} name 
 * @param {annonsetittel} addTittle 
 * @param {annonseID} enID
 * @param {UID til eier av annonsen} eierUID
 */
function lagSamtale(name, addTitle, enID, eierUID) {
    var samtaleID = Date.now();
    var finnesSamtale = false;

    firebase.database().ref("samtale").once("value", (snapshot) => {
        var data = snapshot.val();
        if (snapshot.exists()) {
            for (let i in data) {
                if (data[i].annonseID === enID && data[i].interessertID === brukerID && finnesSamtale == false) {
                    alert("Du har allerede en samtale knyttet til denne annonsen");
                    finnesSamtale = true;
                } else if (eierUID == firebase.auth().currentUser.uid) { //brukerID
                    alert("Du er eier av annonsen");
                    finnesSamtale = true;
                }
            }          
        }
    }).then(() => {
        if (!finnesSamtale) {
            firebase.database().ref('samtale').child(samtaleID).set({
                annonseEier : name,
                annonseInteressert : username,
                annonseTittel : addTitle,
                annonseID : enID,
                samtaleID : samtaleID,
                interessertID : brukerID,
                eierID : eierUID
            }).then(() => {
                navigate("melding");
            });
        }
    });
    
}



/* 
 * Koden under har som ansvar å legge til innhold i html-elementer på chat-siden
 * når en samtale blir opprettet i realtime-databasen. Innhold skal bli gitt til
 * riktig brukere, altså brukeren som starter/oppretter samtalen, og eier av den aktuelle annonsen
 * 
 */
firebase.database().ref('samtale').on("child_added", function (snapshot) {
    var message = snapshot.val();

    if (message.interessertID === brukerID) {  //Dersom du er den som tar kontakt annonseInteressert === username
        chatListLeft.innerHTML +=  `<li class="another-chat" onclick="openChat(` + snapshot.key + `)">` + 
                                        `<br>` +
                                        `<h5>` + message.annonseEier + `</h5>` +
                                        `<p>` + message.annonseTittel + `</p>` + 
                                        `<br>` +
                                   `</li>`;
        chatListTop.innerHTML +=    `<li class="another-chat" onclick="openChat(`+ snapshot.key + `)">  
                                        <div>
                                            <h5>` + message.annonseEier + `</h5>` + 
                                            `<p>` + message.annonseTittel + `</p>` + 
                                        `</div>
                                    </li>`
    } else if (message.eierID === brukerID) {
        chatListLeft.innerHTML +=  `<li class="another-chat" onclick="openChat(` + snapshot.key + `)">` + 
                                        `<br>` +
                                        `<h5>` + message.annonseInteressert + `</h5>` +
                                        `<p>` + message.annonseTittel + `</p>` + 
                                        `<br>` +
                                   `</li>`;
        chatListTop.innerHTML +=    `<li class="another-chat" onclick="openChat(`+ snapshot.key + `)">  
                                        <div>
                                            <h5>` + message.annonseInteressert + `</h5>` + 
                                            `<p>` + message.annonseTittel + `</p>` + 
                                        `</div>
                                    </li>`
    }
});



/*
 * Metoden aktiveres når en bruker trykker på en samtale (boks på venstre side av chat-siden/dropdown meny)
 * Den har ansvar for å hente tidligere meldinger fra den allerede-eksisterende samtalen slik at bruker kan se
 * hva de to partene har skrevet til hverandre tidligere. 
 */
var aktivSamtaleID;
function openChat(samtaleNr) {
    chatWindow.innerHTML = ``; // Fjerner alle meldinger, og så skal meldingene hentes på ny
    aktivSamtaleID = samtaleNr;

    firebase.database().ref("melding/").once('value', (snapshot) => {
        var data = snapshot.val();
        for (let i in data) {
            if (data[i].samtaleNr === samtaleNr) { 
                if (brukerID == data[i].sender) { //username === data[i].sender
                    chatWindow.innerHTML += `<div id='bobler' class='msg-line'><p class='sender-bubble'>${data[i].beskjeden}</p></div>`;
                } else {
                    chatWindow.innerHTML += `<div id='bobler' class="msg-line"><p class="receiver-bubble">${data[i].beskjeden}</p></div>`;
                }
            }
        }
    })
}



/*
 * Koden under aktiveres når en "submitter" noe i formen, altså når bruker trykker på send-knappen, eller
 * trykker enter etter en har skrevet en melding i input-feltet på chat-siden.
 * Koden sender opp meldingen til realtime-databasen, og setter input-feltet til blank 
 */
//sendMelding
form.onsubmit = function (evt) {
    //Logging av chat - Christoffer
    analytics.logEvent('melding_sendt', {
        melding: msg_inp.value,
        sender: username,
    });
    evt.preventDefault();
    var testmeldingID = Date.now();
    firebase.database().ref("melding").child(testmeldingID).set({
        samtaleNr : aktivSamtaleID,
        beskjeden : msg_inp.value,
        sender : brukerID
    });
    msg_inp.value = "";
}



/*
 * Koden under aktiveres når en ny melding blir lagt til i realtime-databasen, og henter meldingen som ble sendt
 * Meldingen blir bare vist frem dersom den ble sendt i aktive samtalen, og skiller mellom om det var du eller brukeren
 * du snakker med som sendte meldingen. 
 */
firebase.database().ref("melding").on("child_added", function (snapshot) {
    var data = snapshot.val();
    //Sjekker om meldingen ble sendt til nåværende samtale
    if (data.samtaleNr == aktivSamtaleID) {
        // sant - er sender deg, eller er sender en annen. Er det deg? -> sett riktig boble osv
        if (data.sender == brukerID) {
            chatWindow.innerHTML += `<div id='bobler' class='msg-line'><p class='sender-bubble'>${data.beskjeden}</p></div>`;
        } else {
            chatWindow.innerHTML += `<div id='bobler' class="msg-line"><p class="receiver-bubble">${data.beskjeden}</p></div>`;
        }
    }
    
});

