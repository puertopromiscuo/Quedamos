(function() {
    var root = this;
    $(document).ready(function() {
        //RECUPERAR PUNTO
        $('#get-point').on('click', function() {
            var point_id = $('#point-id').val();
            getPointDOM(point_id);            
        });
        $('#get-all-point').on('click', function() {            
            getAllPointsDOM();
        });
    });

    function getPointDOM(point_id) {
        MAP_APP.getPoint(point_id, function(data) {
            console.log(data);
        });
    }
    
    function getAllPointsDOM(point_id) {
        MAP_APP.getAllPoints(function(data) {
            console.log(data);
        });
    }
    


    if (!root.MAP_APP) {
        root.MAP_APP = {};
        root.MAP_APP = {};
    }
    root.MAP_APP.getPointDOM = getPointDOM;
    root.MAP_APP.getAllPointsDOM = getAllPointsDOM;

}).call(this);
