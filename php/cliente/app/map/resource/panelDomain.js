(function() {
    var root = this;
    var whereUserId = "user_id= '" + getUserId() + "'";


    function loadMyEvents(callback) {
        EVENTS.getEventsWhere(whereUserId, function(events) {
            callback(events);
        })
    }
    
    function deleteEvent(event_id, callback) {
        deleteEvent(event_id, function(data) {
            callback(data);
        })
    }


    function getUserId() {
        return 110;
    }
    if (!root.PANEL) {
        root.PANEL = {};
    }

    root.PANEL.loadMyEvents = loadMyEvents;
    root.PANEL.deleteEvent = deleteEvent;
    root.PANEL.getUserId=getUserId;


}).call(this);
