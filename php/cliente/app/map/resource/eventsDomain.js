(function() {
    var root = this;    
    
    //OBTENER TODOS LOS EVENTOS
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
    
    //FILTRADO EVENTOS
    function getEventsWhere(where,callback){          
        $.ajax({
                type: 'POST',
                url: 'servidor/services/eventService/getEventsWhereManager',
                dataType: 'json',  
                data: {                    
                    where:where
                }
        }).done(function(data){
            if(data.status =="ok"){                 
                callback(data.result);                                                
            }else{
                console.log(data.message);
            }
        }).fail(function() {                                    
            console.log("error getEventsWhere");            
        });        
    } 
    
    
    
    //INSERTAR EVENTO
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
    //BORRAR EVENTO
    function deleteEvent(event_id,callback){          
        $.ajax({
                type: 'POST',
                url: 'servidor/services/eventService/deleteEventManager',
                dataType: 'json',  
                data: {                    
                    event_id:event_id
                }
        }).done(function(data){
            if(data.status =="ok"){                 
                callback(data.result);                                                
            }else{
                console.log(data.message);
            }
        }).fail(function() {                                    
            console.log("error deleteEvent");            
        });        
    } 
    
    
    
    if (!root.EVENTS) {
        root.EVENTS = {};
    }
 
    root.EVENTS.getAllEvents = getAllEvents;
    root.EVENTS.insertEvent=insertEvent;
    root.EVENTS.getEventsWhere=getEventsWhere;
    root.EVENTS.deleteEvent=deleteEvent;
}).call(this);


