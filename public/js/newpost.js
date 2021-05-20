/* Script er skrevet av Christoffer, utenom der et annet navn eventuelt er markert i koden */

        alert("Hvert gruppemedlem må huske å rydde opp i sin kode og skrive inn kommentarer (javadoc typ). Få med også navn ved det du har gjort");

        //random id funksjon - funnet på nettet
        function randomID() {
        var S4 = function() {
        return (((1 + Math.random()) * 0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }


        //Registrerer om CB er checket, Henter brukers posisjon og lagrer variabel som lastes opp i DB 
        var long = null;
        var lat = null;
        $('#positioncb').on('change', function() { 
            var cb = document.getElementById("positioncb");
            if ($(cb).is(':checked')) {
                //alert("checked");
                if (navigator.geolocation) {
                    long = navigator.geolocation.getCurrentPosition(longitude);
                } else { 
                    console.log(innerHTML = "Geolocation is not supported by this browser.");
                }
                if (navigator.geolocation) {
                    lat = navigator.geolocation.getCurrentPosition(latitude);
                } else { 
                    console.log(innerHTML = "Geolocation is not supported by this browser.");
                }
                function longitude(position) {
                    long = position.coords.longitude;
                }
                function latitude(position) {
                    lat = position.coords.latitude;
                }
                
            } 
             //Disabler publiser knapp i 5 sekunder om posisjon er valgt
             //Legger til loading i 5 sekunder, og går tilbake til normalt etter dette
            $('#publish').prop("disabled", true);
            // spinner på knappen
            $('#publish').html(
            `<span id="laster" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Henter posisjon...`
            );
            setTimeout(function () {
                $('#publish').prop("disabled", false);
                $('#laster').remove();
                $('#publish').html(`publiser`);
            }, 4000); 
        });


        //Gir status i Firebase verdien "Tilbud", dersom tilbud CB er checket
        var status = " ";
        $('#tilbycb').on('change', function() { 
            var tcb = document.getElementById("tilbycb");
            if ($(tcb).is(':checked')) {
                status = "Tilbud";
            }    
        });

        //Gir status i Firebase verdien "Etterspørsel", dersom etterspørsel CB er checket
        $('#etterspørcb').on('change', function() { 
            var ecb = document.getElementById("etterspørcb");
            if ($(ecb).is(':checked')) {
                status = "Etterspørsel";
            } 
        });
 

        //Laster opp tittel, beskrivelse, posisjon og kategori til firebase
        function submitClick() {
            var cb = document.getElementById("positioncb");
            //Gir variablene under en tilfeldig String
            id = randomID(); 
            blå = randomID(); 
            rød = randomID();
            grønn = randomID();

            //hvis posisjon er valgt, pusher vi med longitude og latitude
            if ($(cb).is(':checked')) {
                firebase.database().ref("Annonse").child(id).set({
                    brukernavn: username,
                    tittel: document.getElementById("TitlePost").value,
                    beskrivelse: document.getElementById("DescriptionPost").value,
                    id: id,
                    blå: blå,
                    rød: rød,
                    grønn: grønn,
                    longitude: long,
                    latitude: lat,
                    kategori: status,
                    userid: firebase.auth().currentUser.uid
                });   
            }
            //hvis posisjon ikke er valgt pusher vi uten longitude og latitude
            else {
                firebase.database().ref("Annonse").child(id).set({
                    brukernavn: username,
                    tittel: document.getElementById("TitlePost").value,
                    beskrivelse: document.getElementById("DescriptionPost").value,
                    id: id,
                    blå: blå,
                    rød: rød,
                    grønn: grønn,
                    kategori: status,
                    userid: firebase.auth().currentUser.uid
                });   
            }
                setTimeout(function () {
					window.location.reload(1);
				}, 0001);   
                //Logging av ny annonse
                analytics.logEvent('ny_annonse', { id: id, brukernavn: username, tittel: document.getElementById("TitlePost").value })
            }


          