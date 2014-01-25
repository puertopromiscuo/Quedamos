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
            var point_x;
            var point_y;
            for (var i = 0; i < data.length; i++) {
                addMarker(data[i].point_id,data[i].point_x,data[i].point_y);
            }            
        });
    }
    
    function addMarker(point_id,point_x,point_y) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(point_x,point_y),
            map: map,
            animation: google.maps.Animation.DROP,
            marker_id:point_id
        });
        markers.push(marker);
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

}).call(this);
/*
 * function getPointDOM(point_id) {
        MAP_APP.getPoint(point_id, function(data) {
            console.log(data);
        });
    }
 */