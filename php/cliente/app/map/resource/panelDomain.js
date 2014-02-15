(function() {
    var root = this;
    var userId = "user_id= '" + getUserId() + "'";


    function loadMyEvents(callback) {
        EVENTS.getEventsWhere(userId, function(events) {
            callback(events);
        })
    }
    
    function deleteEvent(event_id, callback) {
        deleteEvent(event_id, function(data) {
            callback(data);
        })
    }


    function getUserId() {
        return 1;
    }
    if (!root.PANEL) {
        root.PANEL = {};
    }

    root.PANEL.loadMyEvents = loadMyEvents;
    root.PANEL.deleteEvent = deleteEvent;


}).call(this);
