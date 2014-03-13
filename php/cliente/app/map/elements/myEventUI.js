(function() {
    var root = this;

    function createMyEvent(event_id, event_title, event_date, event_users) {
        container = $('<div data-eventid ="' + event_id + '" class="row"><br>');
        
        del = $('<button id="del-my-event"  class="glyphicon glyphicon-remove btn btn-danger"> </button>');
        del.on("click", function() {
            EVENTS.deleteEvent($(this).parent().parent().data("eventid"));
            iris.notify("render",true);            
        })
        

        title = $('<button class="col-xs-8"><span>' + event_title + '</span><br><span>' + event_date + '</span></button>');
        title.on("click", function() {            
            for(i=0;i< MAP.markers.length;i++){
                if(MAP.markers[i].event_id == event_id){                    
                    MAP.loadMap2(MAP.markers[i]);
                }
            }
        })
        container.append(title);        
        
        users = $('<div class="col-xs-2"><span class="badge">' + event_users.length + '</span></div>');
        container.append(users);  

        divDel = $(' <div class="col-xs-2">').append(del);
        container.append(divDel);
        
        return container;
    }


    if (!root.MYEVENT) {
        root.MYEVENT = {};
    }

    root.MYEVENT.createMyEvent = createMyEvent;


}).call(this);
