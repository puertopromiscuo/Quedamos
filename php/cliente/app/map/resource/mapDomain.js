(function() {
    var root = this;
    var map;
    var markers = [];
    var markerAux = false;


    function loadMap() {
        geocoder = new google.maps.Geocoder();//buscar de direcciones
        var center = new google.maps.LatLng(52.520816, 13.410186);
        var mapOptions = {
            zoom: 3,
            center: center,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }

    function loadAllMarkers() {
        EVENTS.getAllEvents(function(data) {
            console.log("Cargando eventos del Mapa");
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var marker = MAP.createMarker(data[i].event_id, data[i].event_title, data[i].event_description, data[i].event_date, data[i].event_userid, data[i].event_x, data[i].event_y, data[i].users, map);
                markers.push(marker);
            }
           
        });

    }

    // Borra marcadores del mapa y del array
    function deleteMarkers() {
        var i;
        for (i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    /*busca una direccion y crea un marcador*/
    function findAddress(address, callback) {
        if (markerAux) {
            markerAux.setMap(null);
        }
        geocoder.geocode({'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                map.setZoom(30);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                MAP.animateMarker(marker);
                markerAux = marker;
                markers.push(markerAux);//para borrar marcador en el render 
                callback(markerAux.position);
            } else {
                callback(false);
            }
        });
    }
    function registerUserEvent(event_id) {
        EVENTS.insertUserEvent(event_id,EVENTS.getUserId(), function(data) {
            console.log(data.result);
        })
    }

    
    function renderMap() {
        deleteMarkers();
        loadAllMarkers();
    }





    if (!root.MAP) {
        root.MAP = {};
    }
    root.MAP.loadMap = loadMap;
    root.MAP.loadAllMarkers = loadAllMarkers;
    root.MAP.deleteMarkers = deleteMarkers;
    root.MAP.findAddress = findAddress;
    root.MAP.renderMap = renderMap;
    root.MAP.registerUserEvent = registerUserEvent;



}).call(this);
