iris.screen(function(self) { 
    self.create = function() {
        self.tmpl(iris.path.screen.welcome.html);
        
        var uiMap = self.ui("map-container",iris.path.ui.map.js);
        
        var uiPanel = self.ui("panel-container",iris.path.ui.panel.js, {
            findAddress: uiMap.findAddress,//hacer visible para el uiPanel
            createEvent: uiMap.createEvent,
        });
        
        
    };
}, iris.path.screen.welcome.js);

