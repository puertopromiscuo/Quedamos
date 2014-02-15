iris.ui(function(self) {
    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.myEventUI.html);
        var event = self.setting("event");
        self.inflate(event);
        
        
        self.get("del-proyect").click(function() {                        
            self.notify("del-proyect", {event_id:$(this).attr("eventid")});
        })
        
        
    }

}, iris.path.ui.myEventUI.js);
