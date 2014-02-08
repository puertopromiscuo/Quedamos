iris.ui(function(self) {
    var map;
    
    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.todo.html); 
        initialize();
        getLocalEvents();
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
    function getLocalEvents(){
        markers = [
        MAP_APP.addMarker(1, 52.511467,13.447179,map),
        MAP_APP.addMarker(2,52.520816, 13.410186,map),
        MAP_APP.addMarker(3,52.497622, 13.396110,map)        
        ];
    }
    
    
    
}, iris.path.ui.todo.js);

