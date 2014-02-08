iris.ui(function(self) {
    var map;
    var iterator = 0;
    
    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.todo.html); 
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
        map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
        map.refresh;       
    }
    
    /*carga markadores manualmente*/
    function getLocalMarkers(){
        markers = [
        MAP_APP.addMarker(0, 52.511467,13.447179,null),
        MAP_APP.addMarker(1,52.520816, 13.410186,null),
        MAP_APP.addMarker(2,52.497622, 13.396110,null)        
        ];
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
             dropMarker(i,map);
        }
    }
    function dropMarker(i,map){
        setTimeout(function(){
            markers[i].setMap(map);                                            
        },i*1000)
    }
    
    
}, iris.path.ui.todo.js);

