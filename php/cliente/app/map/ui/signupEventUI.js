iris.ui(function(self) {
    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.signupEventUI.html);
        var event = self.setting("event");
        self.inflate(event);
        
        
        self.get("del-signup-event").click(function() {                        
            self.notify("del-signup-event", {event_id:$(this).attr("eventid")});
        })
        
        
    }

}, iris.path.ui.signupEventUI.js);