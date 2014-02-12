iris.screen(
        function(self) {
            self.create = function() {
                console.log("Loged Screen Created");

                self.tmpl(iris.path.screen.loged.html);
                self.ui("modal-profile", iris.path.ui.profile.js);
                var uiMap = self.ui("map-container", iris.path.ui.map.js);

                var uiPanel = self.ui("panel-container", iris.path.ui.panel.js, {
                    findAddress: uiMap.findAddress, //hacer visible para el uiPanel
                    createEvent: uiMap.createEvent,
                });

            };
            self.awake = function() {
                console.log("Loged Screen Awakened");
                check_session(function(data) {
                    if (data.status === "ok") {
                         self.get("menu-top").text(data.result.name);
                         self.get("id-prueba").text(data.result.id);
                    } else {
                        iris.navigate("#/loged");
                        //iris.navigate("#/unloged");
                    }
                });
            };

            self.sleep = function() {
                console.log("Loged Screen Asleep");
            };

            self.destroy = function() {
                console.log("Loged Screen Destroyed");
            };
            
            
            var settings = {
                type: 'POST',
                url: 'servidor/services/loginService/checkSession',
                dataType: 'json'
            };
            
            function check_session(callback) {
                iris.ajax(settings)
                        .done(function(data)
                        {
                            console.log(data.status);
                            callback(data);
                        })
                        .fail(function() {
                            console.log("Error 101", arguments);
                            callback(promise);
                        })
            }
            ;
        },
        iris.path.screen.loged.js
        );