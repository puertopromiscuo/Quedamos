iris.screen(function(self) { 
    self.create = function() {
        self.tmpl(iris.path.screen.welcome.html);
        self.ui("panel-container",iris.path.ui.panel.js);
        self.ui("map-container",iris.path.ui.map.js);
        
    };
}, iris.path.screen.welcome.js);

