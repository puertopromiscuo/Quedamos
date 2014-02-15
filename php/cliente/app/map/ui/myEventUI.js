iris.ui(function(self) {
    self.create = function() {        
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.myEventUI.html);        
        var event = self.setting("event");        
        self.inflate(event);
        
        
        self.get("del-my-event").click(function() {                        
            self.notify("del-my-event", {event_id:$(this).attr("eventid")});
        })
        
        
    }

}, iris.path.ui.myEventUI.js);
