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
                //deleteMarker(data[i].event_id);
                var marker = MAP.createMarker(data[i].event_id, data[i].event_title, data[i].event_description, data[i].event_date, data[i].event_userid, data[i].event_x, data[i].event_y, data[i].users, data[i].event_type, map);
                markers.push(marker);
            }

        });
    }

    function centerMap(position) {
        map.setCenter(position.position);
        map.setZoom(20);
    }


    // Borra marcadores del mapa y del array
    function deleteMarkers() {
        var i;
        for (i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }
    /*function deleteMarker(event_id) {
        var i;
        for (i = 0; i < markers.length; i++) {
            if(markers[i].event_id == event_id){
                    markers[i].setMap(null);
            }
        }
    }*/
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
        EVENTS.insertUserEvent(event_id, function(data) {
            console.log(data.result);
        })
        come = '<button class="glyphicon glyphicon-minus btn btn-sm btn-danger" onclick="MAP.deleteUserEvent(' + event_id + ');"> Desapuntarte</button>';
        $('#come' + event_id).children().remove();
        $('#come' + event_id).append(come);
        iris.notify("render", false);
    }

    function delUserEvent(event_id) {
        EVENTS.deleteUserEvent(event_id, function(data) {
            console.log(data.result);
        })
        come = '<button class="glyphicon glyphicon-plus btn btn-sm btn-success" onclick="MAP.registerUserEvent(' + event_id + ');"> Me apunto</button>';
        $('#come' + event_id).children().remove();
        $('#come' + event_id).append(come);
        iris.notify("render", false);
    }

    function renderMap() {
        deleteMarkers();
        loadAllMarkers();
    }

    function filterMarkers(type, date) {
        markers.forEach(function(marker) {
            if (marker.event_type == type || type == "all") {
                marker.setMap(map);
            } else {
                marker.setMap(null);
            }
        })
        if (date) {
            markers.forEach(function(marker) {
                if (marker.event_date != date) {
                    marker.setMap(null);
                }
            });
        }
    }

    function earNewEvent() {
        EVENTS.getAllEvents(function(data) {
            console.log("Cargando eventos del Mapa");
            if (data.length !== markers.length) {
                console.log("Falta actualizar");
                renderMap();
            } else {
                console.log("Nada que actualizar");
            }
        });
    }


    if (!root.MAP) {
        root.MAP = {};
    }
    root.MAP.loadMap = loadMap;
    root.MAP.loadAllMarkers = loadAllMarkers;
    //root.MAP.deleteMarkers = deleteMarkers;
    root.MAP.findAddress = findAddress;
    root.MAP.renderMap = renderMap;
    root.MAP.registerUserEvent = registerUserEvent;
    root.MAP.deleteUserEvent = delUserEvent;
    //prueba
    root.MAP.markers = markers;
    root.MAP.centerMap = centerMap;
    root.MAP.filterMarkers = filterMarkers;
    root.MAP.earNewEvent = earNewEvent;



}).call(this);
