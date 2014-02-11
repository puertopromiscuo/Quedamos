iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Loged Screen Created");
            self.tmpl(iris.path.screen.loged.html);
            self.ui("modal-profile", iris.path.ui.profile.js);
            var uiMap = self.ui("map-container",iris.path.ui.map.js);
        
        var uiPanel = self.ui("panel-container",iris.path.ui.panel.js, {
            findAddress: uiMap.findAddress,//hacer visible para el uiPanel
            createEvent: uiMap.createEvent,
        });
        };
        self.awake = function () {   
            console.log("Loged Screen Awakened");
        };

        self.sleep = function () {
            console.log("Loged Screen Asleep");
        };

        self.destroy = function () {
            console.log("Loged Screen Destroyed");
        };
    },
    iris.path.screen.loged.js
);