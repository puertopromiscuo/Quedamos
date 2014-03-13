iris.ui(
        function(self) {
            self.create = function() {
                console.log("profile UI Created");
                self.tmpl(iris.path.ui.profile.html);
            };
            
            self.awake = function() {
                console.log("profile UI Awakened");
                EVENTS.checkSession(function(data) {
                    self.get('name').attr("placeholder", data.name);                    
                });
            };
            self.sleep = function() {
                console.log("profile UI Asleep");
            };

            self.destroy = function() {
                console.log("profile UI Destroyed");
            };
        },
        iris.path.ui.profile.js
        );