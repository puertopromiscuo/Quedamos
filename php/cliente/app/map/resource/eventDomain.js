(function() {
    var root = this;   
    
    //OBTENER TODOS LOS PUNTOS
    function getAllEvents(callback){
        $.ajax({
                type: 'POST',
                url: 'servidor/services/eventService/getAllEventsManager',
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


