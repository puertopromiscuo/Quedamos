iris.ui(function(self) {
    self.create = function() {
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.ui.map.html);
        MAP.loadMap();                      
    }    
}, iris.path.ui.map.js);

