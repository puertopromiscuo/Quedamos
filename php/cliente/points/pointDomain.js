(function() {
    var root = this;
    
    function getPoint(point_id, callback){
        $.ajax({
                type: 'POST',
                url: '../../servidor/services/pointService.php/getPoint/',
                dataType: 'json',
                data:{point_id:point_id}
        }).done(function(data){
            callback(data);
        }).fail(function() {                                    
            console.log("error");            
        });        
    }
    if (!root.MAP_APP) {
        root.MAP_APP = {};
    }
    root.MAP_APP.getPoint = getPoint;
}).call(this);


