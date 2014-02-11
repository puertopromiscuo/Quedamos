iris.screen(
        function(self) {

            var settings = {
                type: 'POST',
                url: 'servidor/services/loginService/checkSession',
                dataType: 'json'
            };
            
            self.create = function() {
                console.log("unloged Screen Created");
                self.tmpl(iris.path.screen.unloged.html);
                self.ui("modal", iris.path.ui.register.js);
            };
            self.awake = function() {
                console.log("unloged Screen Awakened");
            };

            /*self.canSleep = function() {
                console.log("Can unloged Sceen sleep?");
                return false;
            };*/

            self.sleep = function() {
                console.log("unloged Screen Asleep");
            };

            self.destroy = function() {
                console.log("unloged Screen Destroyed");
            };

        },
        iris.path.screen.unloged.js
        );
