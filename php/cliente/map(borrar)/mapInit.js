(function() {
    var root = this;
    $(document).ready(function() {
        
        //CARGAR MAPA 
        //initialize();
        //drop();
        //addMarker1(new google.maps.LatLng(52.517683, 13.394393));
        MAP_APP.getAllEvents();
        
    });
    
    function getAllEventsDOM() {
        MAP_APP.getAllEvents(function(data) {
            console.log(data);
        });
    }
   
    if (!root.MAP_APP) {
        root.MAP_APP = {};
    }
    root.MAP_APP.getAllEventsDOM = getAllEventsDOM;    
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
