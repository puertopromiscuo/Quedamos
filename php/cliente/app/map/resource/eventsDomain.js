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
            console.log("error getAllEvents");            
        });        
    } 
    
    //OBTENER TODOS LOS PUNTOS
    function insertEvent(event_title,event_description, event_date, user_id, point_x, point_y,callback){
        $.ajax({
                type: 'POST',
                url: 'servidor/services/eventService/insertEventManager',
                dataType: 'json',
                data: {
                    event_title:event_title,
                    event_description:event_description,
                    event_date:event_date,
                    user_id:user_id,
                    point_x:point_x,
                    point_y:point_y
                }
        }).done(function(data){
            if(data.status ==="ok"){                 
                callback(data.result);
            }else{
                console.log(data.message);
            }
        }).fail(function() {                                    
            console.log("error insertEvent");            
        });        
    } 
    
    if (!root.EVENTS) {
        root.EVENTS = {};
    }
 
    root.EVENTS.getAllEvents = getAllEvents;
}).call(this);


