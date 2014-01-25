(function() {
    var root = this;
    var map;
    var markers = [];
    
    function getAllEvents(){
        MAP_APP.getAllPoints();
    }
    
    
    if (!root.MAP_APP) {
        root.MAP_APP = {};
    }
    /*root.MAP_APP.getPoint = getPoint;
    root.MAP_APP.getAllPoints = getAllPoints;*/
}).call(this);


