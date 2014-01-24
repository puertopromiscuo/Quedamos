(function() {

    $(document).ready(function() {
         $('#clearMarkers').on('click',function(){
             clearMarkers();
         });         
        initialize();
        addMarker(new google.maps.LatLng(37.7699298, -122.4469157));


    });
    var map;
    var markers = [];

    function initialize() {
        var haightAshbury = new google.maps.LatLng(37.7699298, -122.4469157);
        var mapOptions = {
            zoom: 12,
            center: haightAshbury,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);

        google.maps.event.addListener(map, 'click', function(event) {
            addMarker(event.latLng);
        });
    }

// Add a marker to the map and push to the array.
    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }

// Sets the map on all markers in the array.
    

// Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setAllMap(null);
    }

// Shows any markers currently in the array.
    function showMarkers() {
        setAllMap(map);
    }
    
    function setAllMap(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

// Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }
}).call(this);
