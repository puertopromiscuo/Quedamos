(function() {
    var root = this;
    
    var image = new google.maps.MarkerImage(
            './img/event.png'
            , new google.maps.Size(40, 53)
            );
    
    function addMarker(point_id, point_x, point_y,map) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(point_x, point_y),
            map: map,
            icon: image,
            title: ""+point_id,
            animation: google.maps.Animation.DROP,
            marker_id: point_id
        });
        google.maps.event.addListener(marker, 'click', function() {
            map.setZoom(15);
            map.setCenter(marker.getPosition());
            animaMarker(this);
            getInfoWindow(this);
        });        
       return marker;
    }

    //Animar marcador onclick
    function animaMarker(marker) {
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
    //Mostrar titulo
    function getInfoWindow(marker) {
        var infowindow = new google.maps.InfoWindow({
            content: '<div class="marker">' + marker.title + '</div>'
        });
        infowindow.open(marker.get('map'), marker);        
    }  

    if (!root.MAP_APP) {
        root.MAP_APP = {};
    }
    
    root.MAP_APP.addMarker = addMarker;
    root.MAP_APP.animaMarker = animaMarker;
    root.MAP_APP.getInfoWindow = getInfoWindow;    

}).call(this);
/*var map;
    var markers = [
        new google.maps.LatLng(52.511467, 13.447179),
        new google.maps.LatLng(52.549061, 13.422975),
        new google.maps.LatLng(52.497622, 13.396110)        
    ];
    var iterator = 0;

    function initialize() {
        var haightAshbury = new google.maps.LatLng(52.520816, 13.410186);
        var mapOptions = {
            zoom: 12,
            center: haightAshbury,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
    }

    //Añade el marcador al mapa y lo guarda en el array
    function addMarker1(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }
    
    function drop() {
        for (var i = 0; i < markers.length; i++) {
          setTimeout(function() {
            addMarker();
          }, i * 3000);
        }
      }
    function addMarker() {
        markers.push(new google.maps.Marker({
          position: markers[iterator],
          map: map,
          draggable: false,
          animation: google.maps.Animation.DROP
        }));
        iterator++;
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

    // Borra marcadores del mapa y del array
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }*/
