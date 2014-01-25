(function() {
    var root = this;
    var map;
    var markers = [];
    
    function getAllEvents(callback){
        $.ajax({
                type: 'POST',
                url: '../../servidor/services/pointService.php/getAllPoints/',
                dataType: 'json'                
        }).done(function(data){
            if(data.status =="ok"){
                callback(data.result);
            }else{
                console.log(data.message);
            }
        }).fail(function() {                                    
            console.log("error getAllPoints");            
        });        
    }
    
    
    if (!root.MAP_APP) {
        root.MAP_APP = {};
    }
    root.MAP_APP.getAllEvents = getAllEvents;    
}).call(this);


