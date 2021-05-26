  /* Script er skrevet av Christoffer Arnesen, utenom der et annet navn eventuelt er markert i koden */



$(document).ready(function () { 
    /* Fjerner alt innhold i modal/popup etter den lukkes
    * slik at riktig informasjon altid vises når den åpnes på nytt
    */
    $("#myModal").on("hidden.bs.modal", function(){
        var tilbbtn = document.getElementById("edtilbycb");
               tilbbtn.checked = false;
        var etterbtn = document.getElementById("edetterspørcb");
               etterbtn.checked = false;
            });

    //Gjør så man ikke kan klikke seg ut av edit popup etter den er åpnet
    $('#myModal').modal({backdrop: 'static', keyboard: false})

    /* Referanse til firebase
    * henter ned verdier fra firebase og lagrer de som lokale variabler
    * dette skjer hele tiden så lenge nye annonser blir pushet til firebase
    */
    var rootRef = firebase.database().ref().child("Annonse");
    rootRef.on("child_added", snap => {
        var title = snap.child("tittel").val();
        var desc = snap.child("beskrivelse").val();
        var blå = snap.child("blå").val();
        var rød = snap.child("rød").val();
        var grønn = snap.child("grønn").val();
        var id = snap.child("id").val();
        var longitude = snap.child("longitude").val();
        var latitude = snap.child("latitude").val();
        var bruker = snap.child("brukernavn").val();
        var annbrukerid = snap.child("userid").val();

        //Sjekker hvem bruker som er innlogget, henter kun denne brukerens annonser
        if(firebase.auth().currentUser.uid == annbrukerid) {
        /* Fyller ut en html table med titler og handlingsknapper
        * Hver knapp får en unik id som er lagret sammen med annonsene, som gjør det mulig for oss
        * å huke tak i en spesifikk knapp, dette er fordi det vil være mange "like" knapper
        * dersom man har flere annonser
        */
        $("#table").append('<tr> <td class = "pt-4" style = "width:65%" id = "tekst">' + title + '</td>' + '<td>' + '<th scope="row">' +
            '<button type="button" class="btn btn-primary text-center m-2" id="' + blå + '" >' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">' +
            '<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>' +
            '</svg>' + '</button>' +

            '<button type="button" class="btn btn-danger text-center m-2" id="' + rød + '">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">' +
            ' <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>' +
            '</svg>' + '</button' + '</th>' +

            '<button type="button" class="btn btn-success text-center m-2" id="' + grønn + '">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">' +
            '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>' +
            '</svg>' + '</button>' + '</tr></td>');
            }
            
/* Fullført knapp (Grønn), pusher annonsen til fullført tabellen i Firebase
* og fjerner annonsen fra "Annonser" tabellen i firebase og på nettsiden
*/
var titleee;
$(document).ready(function() {
$('body').on('click', '#' + grønn +'', function() {
    firebase.database().ref("Fullført").child(id).set({
    tittel: document.getElementById("Title").value = snap.child("tittel").val(),
    id: id,
    brukernavn: username,
    userid: firebase.auth().currentUser.uid
    });  
    firebase.database().ref("Annonse").child(id).remove();
    setTimeout(function() {
    window.location.reload(1);
    }, 0200); 
    //Logging av fullført annonse
    analytics.logEvent('annonse_fullført', {
        id: id, 
        brukernavn: username, 
        tittel: document.getElementById("Title").value = snap.child("tittel").val() 
        })
    });
});
        //Edit knapp (Blå), åpner popup
        $(document).ready(function () {
            var edstatus = "ikke valgt";
            $('body').on('click', '#' + blå + '', function () {
                $('#myModal').modal('show');
                document.getElementById("Title").value = snap.child("tittel").val();
                document.getElementById("Description").value = snap.child("beskrivelse").val();

                //Tilbud checkbox, gir CBen verdien "Tilbud"
                $('#edtilbycb').on('change', function() { 
                var tcb = document.getElementById("edtilbycb");
                    if ($(tcb).is(':checked')) {
                    edstatus = "Tilbud";
                    }    
                });
                //Etterspørsel checkbox, gir CBen verdien "Tilbud"
                $('#edetterspørcb').on('change', function() { 
                    var ecb = document.getElementById("edetterspørcb");
                    if ($(ecb).is(':checked')) {
                    edstatus = "Etterspørsel";
                    } 
                });

                //Rediger posisjon i edit vinduet
                var edlong = null;
                var edlat = null;
                $('#edpositioncb').on('change', function() { 
                    var edcb = document.getElementById("edpositioncb");
                    if ($(edcb).is(':checked')) {
                        if (navigator.geolocation) {
                            edlong = navigator.geolocation.getCurrentPosition(longitude);
                        } else { 
                            console.log(innerHTML = "Geolocation is not supported by this browser.");
                        }
                        if (navigator.geolocation) {
                            edlat = navigator.geolocation.getCurrentPosition(latitude);
                        } else { 
                            console.log(innerHTML = "Geolocation is not supported by this browser.");
                        }
                        function longitude(position) {
                            edlong = position.coords.longitude;
                        }
                        function latitude(position) {
                            edlat = position.coords.latitude;
                        } 
                        //Disabler publiser knapp i 5 sekunder om posisjon er valgt
                        //Legger til loading i 5 sekunder, og går tilbake til normalt etter dette
                        $('#update').prop("disabled", true);
                        // spinner på knappen
                        $('#update').html(
                        `<span id="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Henter posisjon...`
                        );
                        setTimeout(function () {
                            $('#update').prop("disabled", false);
                            $('#loading').remove();
                            $('#update').html(`oppdater`);
                        }, 4000);  
                    } 
                });

                //Gir Tilbud CB checked automatisk hvis annonsen er et tilbud
                tilb = document.getElementById("edtilbycb").value = snap.child("kategori").val();
                if (tilb == "Tilbud") {
                edstatus = "Tilbud"; //gir Tilbud CB Verdi på nytt når CBen er checket fra før av
                var tilbbtn = document.getElementById("edtilbycb");
                tilbbtn.checked = true;
                }
                //Gir Etterspørsel CB checked automatisk hvis annonsen er en Etterspørsel
                etters = document.getElementById("edetterspørcb").value = snap.child("kategori").val();
                if (etters == "Etterspørsel") {
                edstatus = "Etterspørsel"; //gir Etterspørsel CB Verdi på nytt når CBen er checket fra før av
                var ettersbtn = document.getElementById("edetterspørcb");
                ettersbtn.checked = true;
                }
                //Gir posisjon CB checked automatisk hvis annonsen bruker posisjon
                lonpos = snap.child("longitude").val();
                latpos = snap.child("latitude").val();
                if (lonpos !=null && latpos !=null) {
                edlong = lonpos; //gir lon Verdi på nytt når CBen er checket fra før av
                edlat = latpos; //gir lat Verdi på nytt når CBen er checket fra før av
                var posbtn = document.getElementById("edpositioncb");
                posbtn.checked = true;
                }

                /* Oppdater Annonser knapp i popuppen
                * Dersom vi velger å ha på posisjon da vi redigerer
                * Annonsene våre sender vi longitude og latitude til Firebase
                */
                $('body').on('click', '#update', function () {
                    var edcb = document.getElementById("edpositioncb");
                    if ($(edcb).is(':checked')) {
                    firebase.database().ref("Annonse").child(id).update({
                        tittel: document.getElementById("Title").value,
                        beskrivelse: document.getElementById("Description").value,
                        kategori: edstatus,
                        longitude: edlong,
                        latitude: edlat
                    });
                        //Logging av rediger annonse med posisjon
                        analytics.logEvent('annonse_redigert', { 
                        id: id, 
                        brukernavn: username, 
                        tittel: document.getElementById("Title").value, 
                        beskrivelse: document.getElementById("Description").value,
                        kategori: edstatus,
                        longitude: edlong,
                        latitude: edlat
                    })
                    /* Fjerner longitude og latitude i DB om posisjon CB ikke er checked, 
                    * dermed vil annonsen ikke vises på kartet
                    */
                    } else {
                        firebase.database().ref("Annonse").child(id).update({
                        tittel: document.getElementById("Title").value,
                        beskrivelse: document.getElementById("Description").value,
                        kategori: edstatus,
                        longitude: null,
                        latitude: null
                    });
                       //Logging av rediger annonse uten posisjon
                       analytics.logEvent('annonse_redigert', { 
                        id: id, 
                        brukernavn: username, 
                        tittel: document.getElementById("Title").value, 
                        beskrivelse: document.getElementById("Description").value,
                        kategori: edstatus
                    })
                    }
                    //Refresher siden etter Annonsen er oppdatert
                    setTimeout(function () {
                        window.location.reload(1);
                    }, 0000);
                });
            });
        });

        /* Remove knapp (Rød), fjerner raden fra databasen ved bruk av Keyen
        * Keyen til hver enkelt annonse er lagret i en kolonne i Firebase,
        * kolonnen heter "id", for hver annonse som blir hentet ned fra firebase
        * som blir vist under mine annonser, henter vi denne "iden" og lagrer den som en lokal variabel.
        * dette gjør det enklere for oss å huke tak i en spesifik annonse, ettersom hver key er identisk med "iden".
        */
        $(document).ready(function () {
            $('body').on('click', '#' + rød + '', function () {
                firebase.database().ref("Annonse").child(id).remove();
                setTimeout(function () {
                    window.location.reload(1);
                }, 0001);
                //Logging av slettet annonse
                analytics.logEvent('annonse_slettet', { 
                id: id,
                brukernavn: username,
                tittel: document.getElementById("Title").value = snap.child("tittel").val() 
                })  
            });
        });
    });

//Henter data fra fullført tabell i Firebase og fyller ut fullført tabell på nettsiden
var root = firebase.database().ref().child("Fullført");
    root.on("child_added", snap => { 
    titleee = snap.child("tittel").val();
    var fullfbrukerid = snap.child("userid").val(); //bruker id i fullført tabell
    if(firebase.auth().currentUser.uid == fullfbrukerid) {
    $("#done").append( '<tr> <td class = "pt-4" style = "width:65%" id = "tekst">' + titleee + '</td>'+ '</tr>');
    }
    }); 
});


// JavaScript kode fra Innstillinger.ejs:
document.getElementById("flexCheckDefault").onclick = function () {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
        });

    else
        console.log("geolocation is not supported");
};


var slider = document.getElementById("Avstand");
var output = document.getElementById("Verdi");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}
//Slutt på JavaScript kode fra Instillinger.ejs