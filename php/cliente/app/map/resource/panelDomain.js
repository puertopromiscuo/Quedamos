(function() {
    var root = this;
    var whereUserId = "user_id= '" + EVENTS.getUserId() + "'";


    function loadMyEvents(callback) {
        EVENTS.getEventsWhere(whereUserId, function(events) {
            callback(events);
        })
    }
    
    function deleteEvent(event_id, callback) {
        EVENT.deleteEvent(event_id, function(data) {
            callback(data);
        })
    }    
    

    
    
    if (!root.PANEL) {
        root.PANEL = {};
    }

    root.PANEL.loadMyEvents = loadMyEvents;
    root.PANEL.deleteEvent = deleteEvent;
    


}).call(this);
