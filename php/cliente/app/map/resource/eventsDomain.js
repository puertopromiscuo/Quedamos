(function() {
    var root = this;  
    var userId = 118;
    //OBTENER TODOS LOS EVENTOS    
    function getAllEvents(callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/getAllEventsManager',
            dataType: 'json'
        }).done(function(data) {
            if (data.status == "ok") {               
                callback(data.result);
            } else {
                console.log(data.message);
            }
        }).fail(function() {
            console.log("error getAllEvents");
        });
    }

    //INSERTAR EVENTO
    function insertEvent(event_title, event_description, event_date, event_userid, event_x, event_y, callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/insertEventManager',
            dataType: 'json',
            data: {
                event_title: event_title,
                event_description: event_description,
                event_date: event_date,
                event_userid: event_userid,
                event_x: event_x,
                event_y: event_y
            }
        }).done(function(data) {            
            if (data.status === "ok") {
                console.log(data)
                callback(data.result);
            } else {
                console.log(data.message);
            }
        }).fail(function() {
            console.log("error insertEvent");
        });
    }
    //BORRAR EVENTO
    function deleteEvent(event_id, callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/deleteEventManager',
            dataType: 'json',
            data: {
                event_id: event_id
            }
        }).done(function(data) {
            if (data.status == "ok") {
                console.log(data)
                callback(data.result);
            } else {
                console.log(data.message);
            }
        }).fail(function() {
            console.log("error deleteEvent");
        });
    }
    //APUNTARSE A UN EVENTO

    function insertUserEvent(event_id, user_id,callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/insertUserEventManager',
            dataType: 'json',
            data: {
                user_id: user_id,
                event_id: event_id
            }
        }).done(function(data) {
            if (data.status == "ok") {
                console.log(data)
                callback(data);
            } else {
                console.log(data.message);
            }
        }).fail(function() {
            console.log("error registerEvent");
        });
    }
    
    //DESAPUNTARSE DE UN EVENTO
    function deleteUserEvent(event_id, callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/deleteUserEventManager',
            dataType: 'json',
            data: {
                user_id: getUserId(),
                event_id: event_id
            }
        }).done(function(data) {
            if (data.status == "ok") {
                console.log(data)
                callback(data);
            } else {
                console.log(data.message);
            }
        }).fail(function() {
            console.log("error deleteregisterEvent");
        });
    }

            
   function checkSession(callback) {
               $.ajax({
                   type: 'POST',
                   url: 'servidor/services/loginService/checkSession',
                   dataType: 'json'
                   }).done(function(data){                       
                      callback(data.result);
                   }).fail(function() {
                   console.log("Error usuario no existente");
               })
           };
    
    function getUserId(){
        return 118;
    }
    
     function arrayUsersToString(users){
        var usersString ="";
        if(users.length){   
            users.forEach(function(usuario){               
                usersString += usuario.user_name+"/";
            })            
        }
        return usersString;
    }
    
     

    if (!root.EVENTS) {
        root.EVENTS = {};
    }

    root.EVENTS.getAllEvents = getAllEvents;
    root.EVENTS.insertEvent = insertEvent;
    root.EVENTS.deleteEvent = deleteEvent;
    root.EVENTS.insertUserEvent = insertUserEvent;    
    root.EVENTS.deleteUserEvent = deleteUserEvent;
    root.EVENTS.getUserId = getUserId; 
    root.EVENTS.arrayUsersToString = arrayUsersToString; 
    


    
}).call(this);


