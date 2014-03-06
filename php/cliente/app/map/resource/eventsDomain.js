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
                console.log(data)
                callback(data.result);
            } else {
                console.log(data.message);
            }
        }).fail(function() {
            console.log("error getAllEvents");
        });
    }

    //FILTRADO EVENTOS
    function getEventsWhere(where, callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/getEventsWhereManager',
            dataType: 'json',
            data: {
                where: where
            }
        }).done(function(data) {
            if (data.status == "ok") {
                console.log(data)
                callback(data.result);
            } else {
                console.log(data.message);
            }
        }).fail(function() {
            console.log("error getEventsWhere");
        });
    }
    //FILTRADO EVENTOS APUNTADOS
    function getRegisterEvent(where, callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/getRegisterEventManager',
            dataType: 'json',
            data: {
                where: where
            }
        }).done(function(data) {            
            if (data.status == "ok") {
                console.log(data)
                callback(data.result);
            } else {
                console.log(data.message);
            }
        }).fail(function() {
            console.log("error getRegisterEvent");
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
    function registerEvent(event_id, callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/registerEventManager',
            dataType: 'json',
            data: {
                event_userid: getUserId(),
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
    function deleteregisterEvent(event_id, callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/eventService/deleteregisterEventManager',
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

    function getUserId() {
        return 110;
    };



    if (!root.EVENTS) {
        root.EVENTS = {};
    }

    root.EVENTS.getAllEvents = getAllEvents;
    root.EVENTS.insertEvent = insertEvent;
    root.EVENTS.getEventsWhere = getEventsWhere;
    root.EVENTS.getRegisterEvent=getRegisterEvent;
    root.EVENTS.deleteEvent = deleteEvent;
    root.EVENTS.registerEvent = registerEvent;
    root.EVENTS.getUserId = getUserId;
    root.EVENTS.deleteregisterEvent=deleteregisterEvent;
}).call(this);


