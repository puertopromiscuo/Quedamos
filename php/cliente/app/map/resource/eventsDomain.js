(function() {
    var root = this;       
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
    function insertEvent(event_title, event_description, event_date, event_userid, event_x, event_y,event_type,callback) {
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
                event_y: event_y,
                event_type:event_type
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

    function insertUserEvent(event_id, callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/insertUserEventManager',
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

    //DESAPUNTAR A OTRO USUARIO
    function deleteUserMyEvent(event_id,user_id, callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/deleteUserEventManager',
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
            console.log("error deleteregisterEvent");
        });
    }

    //USUARIO
    function checkSession(callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/checkSession',
            dataType: 'json'
        }).done(function(data) {
            callback(data.result);
        }).fail(function() {
            console.log("Error usuario no existente");
        })
    }

    function closeSession(callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/logOut',
            dataType: 'json'
        }).done(function(data) {
            callback(data);
        }).fail(function() {
            console.log("Error CERRAR SESSION");
        })
    }
    function updateProfile(imagen,callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/updateProfile',
            dataType: 'json',
            data: {
                image: imagen
            }
        }).done(function(data) {
            callback(data);
        }).fail(function() {
            console.log("Error UPDATE PERFIL");
        })
    }
    
    function updatePassProfile(userId,pass,pass2,callback) {
         $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/updateDataUser',
            dataType: 'json',
            data: {
                user_id: userId,
                user_pass: pass,
                user_pass2: pass2
            }
        }).done(function(data) {
            callback(data);
        }).fail(function() {
            console.log("Error UPDATE DATE");
        }) 
       
        
    }
    
    function lastUpdateDate(callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/lastUpdateTable',
            dataType: 'json',
            data: {
                update_date: iris.updateDate
            }
        }).done(function(data) {
            callback(data);
        }).fail(function() {
            console.log("Error UPDATE DATE");
        })
    }

    
    function getUserId() {
        return iris.userId;     
    }    

    function arrayUsersToString(users) {
        var usersString = "";
        if (users.length) {
            users.forEach(function(usuario) {
                usersString += usuario.user_name + "/";
            })
        }
        return usersString;
    }

    function countEvents(callback) {
        getAllEvents(function(data) {
            var countProjectCome = 0;
            var countMyProject = 0;
            for (var i in data) {
                for (var j in data[i].users) {
                    if (data[i].users[j].user_id == getUserId()) {
                        countProjectCome++;
                    }
                }
                if (data[i].event_userid == getUserId()) {
                    countMyProject++;
                }
            }
            data = {
                eventsCome: countProjectCome,
                eventsMy: countMyProject
            };
            callback(data);
        });
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
    root.EVENTS.countEvents = countEvents;
    root.EVENTS.closeSession = closeSession;
    root.EVENTS.checkSession = checkSession;
    root.EVENTS.updateProfile = updateProfile;
    root.EVENTS.deleteUserMyEvent = deleteUserMyEvent;
    root.EVENTS.lastUpdateDate = lastUpdateDate;
    root.EVENTS.updatePassProfile = updatePassProfile;




}).call(this);


