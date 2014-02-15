iris.ui(function(self) {
    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.registerEventUI.html);
        var event = self.setting("event");
        self.inflate(event);
        
        
        self.get("del-register-event").click(function() {                        
            self.notify("del-register-event", {event_id:$(this).attr("eventid")});
        })
        
        
    }

}, iris.path.ui.registerEventUI.js);