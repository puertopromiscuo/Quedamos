(function() {
    var root = this;
    $(document).ready(function() {
        initialize()
        //getAllEvents();

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
            for (var i = 0; i < data.length; i++) {
               var marker = MAP_APP.addMarker(data[i].point_id, data[i].point_x, data[i].point_y,map);
               markers.push(marker);
            }
        });
    } 

    //Oculta marcadores del mapa
    function clearMarkers() {
        setAllMap(null);        
    }

    // Mostrar los marcadores del array
    function showMarkers() {
        setAllMap(map);       
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
    root.MAP_APP.clearMarkers = clearMarkers;
    root.MAP_APP.showMarkers = showMarkers;
    root.MAP_APP.setAllMap = setAllMap;

}).call(this);
/*
 * function getPointDOM(point_id) {
 MAP_APP.getPoint(point_id, function(data) {
 console.log(data);
 });
 }
 */