(function() {
    var root = this;



    function loadEvents(callback) {
        EVENTS.getAllEvents(callback, function(data) {
            var myEventList = [];
            data.forEach(function(event) {
                alert(event);
                if (event.event_userid == EVENTS.getUserId()) {
                    myEventList(event);
                }
            })

            callback(myEventList)
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

    root.PANEL.loadEvents = loadEvents;
    root.PANEL.deleteEvent = deleteEvent;
    root.PANEL.getToday = getToday;



}).call(this);

