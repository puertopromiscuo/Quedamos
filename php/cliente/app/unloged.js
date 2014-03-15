iris.screen(
        function(self) {



            self.create = function() {
                console.log("unloged Screen Created");
                self.tmpl(iris.path.screen.unloged.html);
                self.ui("modal", iris.path.ui.register.js);
            };
            self.awake = function() {
                MAP.check_session(function(data) {
                    console.log(data);
                    if (data.status === "ok") {
                        iris.navigate("#/loged");
                    }
                });
            };

            self.sleep = function() {
                console.log("unloged Screen Asleep");
            };

            self.destroy = function() {
                console.log("unloged Screen Destroyed");
            };

        },
        iris.path.screen.unloged.js
        );
