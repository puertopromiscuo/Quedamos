(function() {
    var root = this;
    $(document).ready(function() {
        initialize()
        getAllEvents();

    });

    var map;
    var markers = [];

    //Cargar mapa
    function initialize() {
        var center = new google.maps.LatLng(52.520816, 13.410186);
        var mapOptions = {
            zoom: 12,
            center: center,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
    }

    //Obtiene todos los puntos en un array
    function getAllEvents() {
        MAP_APP.getAllPoints(function(data) {
            //markers = data.slice(0);//clona array y lo copia              
            for (var i = 0; i < data.length; i++) {
                addMarker(data[i].point_id, data[i].point_x, data[i].point_y);
            }
        });
    }

    function addMarker(point_id, point_x, point_y) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(point_x, point_y),
            map: map,
            title: 'Click to zoom',
            animation: google.maps.Animation.DROP,
            marker_id: point_id
        });
        google.maps.event.addListener(marker, 'click', function() {
            map.setZoom(15);
            map.setCenter(marker.getPosition());
            animaMarker(this);
            console.log(this.marker_id);

        });
        markers.push(marker);
    }
    
    //Animar marcador onclick
    function animaMarker(marker) {
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    //Oculta marcadores del mapa
    function clearMarkers() {
        setAllMap(null);
        console.log("clear");
    }

    // Mostrar los marcadores del array
    function showMarkers() {
        setAllMap(map);
        console.log("show");
    }
    //Muestra y Oculta marcadores en el mapa
    function setAllMap(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }



    if (!root.MAP_APP) {
        root.MAP_APP = {};
    }
    root.MAP_APP.getAllEvents = getAllEvents;
    root.MAP_APP.getAllEvents = getAllEvents;
    root.MAP_APP.getAllEvents = getAllEvents;
    root.MAP_APP.getAllEvents = getAllEvents;
    root.MAP_APP.getAllEvents = getAllEvents;
    root.MAP_APP.getAllEvents = getAllEvents;

}).call(this);
/*
 * function getPointDOM(point_id) {
 MAP_APP.getPoint(point_id, function(data) {
 console.log(data);
 });
 }
 */