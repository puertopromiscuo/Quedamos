(function() {
    var root = this;
    var myEvents = [];

    function loadMyEvents(where,callback) {        
        EVENTS.getEventsWhere(where, function(events) {
            callback(events);
        })
    }
    loadMyEvents("event_id > '2'",function(events){
        console.log(events)
    });



    if (!root.PANEL) {
        root.PANEL = {};
    }
    root.PANEL.loadMyEvents = loadMyEvents;


}).call(this);
