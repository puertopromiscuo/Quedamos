iris.ui(function(self) {
    var map;
    self.create = function() {
        console.log("map creado");
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.map.html);
        initialize();
        getLocalMarkers();
        showMarkers();        
    }

    function initialize() {        
        var center = new google.maps.LatLng(52.520816, 13.410186);
        var mapOptions = {
            zoom: 12,
            center: center,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        map.refresh;       
    }

    function codeAddress() {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    //Obtiene todos los puntos en un array
    function getAllEvents() {
        MAP_APP.getAllPoints(function(data) {
            for (var i = 0; i < data.length; i++) {
                var marker = MAP_APP.addMarker(data[i].point_id, data[i].point_x, data[i].point_y, map);
                markers.push(marker);
            }
        });
    }
    /*carga markadores manualmente*/
    function getLocalMarkers() {
        markers = [
            MAP_APP.addMarker(0, 52.511467, 13.447179, map),
            MAP_APP.addMarker(1, 52.520816, 13.410186, map),
            MAP_APP.addMarker(2, 52.497622, 13.396110, map)
        ];
    }
    // Borra marcadores del mapa y del array
    function deleteMarkers() {
        clearMarkers();
        markers = [];
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
        var i;
        for (i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }


}, iris.path.ui.map.js);

