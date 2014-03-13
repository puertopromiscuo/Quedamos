(function() {
    var root = this;



    function loadMyEvents(callback) {
        var eventList = [];
        EVENTS.getAllEvents(function(data) {
            console.log("Cargando mis eventos");                        
            for (var i = 0; i < data.length; i++) {                                
                if (data[i].event_userid == EVENTS.getUserId()) {                                         
                    eventList.push(data[i]);
                }
            }
            console.log(eventList);            
            callback(eventList);            
        })
    }      
    
    
    function loadMyRegisterEvents(callback) {
        var eventList = [];
        EVENTS.getAllEvents(function(data) {
            console.log("Cargando mis eventos apuntados");                        
            data.forEach(function(event) {
                for (var i = 0; i < event.users.length; i++) {
                    if (event.users[i].user_id == EVENTS.getUserId()) {               
                        eventList.push(event);                   
                    }
                }
            })
            console.log(eventList);            
            callback(eventList);            
        })
    }   
    
    


    function deleteEvent(event_id, callback) {
        EVENT.deleteEvent(event_id, function(data) {
            callback(data);
        })
    }

    function deleteregisterEvent(event_id, callback) {
        EVENT.deleteregisterEvent(event_id, function(data) {
            callback(data);
        })
    }

 

        function getToday() {
        var now = new Date();
        var month = (now.getMonth() + 1);
        var day = now.getDate();
        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        var today = now.getFullYear() + '-' + month + '-' + day;
        return today;
    }


    if (!root.PANEL) {
        root.PANEL = {};
    }

    root.PANEL.loadMyEvents = loadMyEvents;
    root.PANEL.deleteEvent = deleteEvent;
    root.PANEL.getToday = getToday;
    root.PANEL.loadMyRegisterEvents=loadMyRegisterEvents;



}).call(this);

