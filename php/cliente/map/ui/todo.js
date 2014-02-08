iris.ui(function(self) {
    var map=1;
    
    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.todo.html); 
        initialize();
    }
    function initialize() {
       var center = new google.maps.LatLng(52.520816, 13.410186);
        var mapOptions = {
            zoom: 12,
            center: center,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
        map.refresh;
       
    }
    
}, iris.path.ui.todo.js);

