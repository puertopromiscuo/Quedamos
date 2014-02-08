iris.screen(function(self) { 
    self.create = function() {
        self.tmpl(iris.path.screen.welcome.html);
        self.ui("map-container",iris.path.ui.todo.js)
    };
}, iris.path.screen.welcome.js);

