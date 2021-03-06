iris.screen(
        function(self) {
            self.create = function() {
                console.log("Loged Screen Created");

                self.tmpl(iris.path.screen.loged.html);
                self.ui("modal-profile", iris.path.ui.profile.js);
                self.ui("map-container", iris.path.ui.map.js);
                self.ui("panel-container", iris.path.ui.panel.js);

                iris.updateDate = "";
                var openPanel;

                /*ALERTAS*/
                iris.on("alertError", function(message) {
                    self.get("error-panel").show().removeClass("hidden").text(message).fadeOut(5000);
                    console.log("event alertError")
                });
                iris.on("alertSuccess", function(message) {
                    self.get("success-panel").show().removeClass("hidden").text(message).fadeOut(5000);
                    console.log("event alertSuccess")
                });


                self.get('log-out').click(function() {
                    EVENTS.closeSession(function(data) {
                        console.log(data.message);
                        iris.navigate("#/unloged");
                    });
                });
                
                
                self.get('button-menu').click(function() {
                    openPanel = !openPanel;
                    if(openPanel){
                        $('#myTab').removeClass("tablet-hidden");
                        $('#juan').removeClass("tablet-hidden");
                        self.get('panel-menu').removeClass("tablet-hidden");
                    }else{
                        $('#myTab').addClass("tablet-hidden");
                        $('#juan').addClass("tablet-hidden");
                        self.get('panel-menu').addClass("tablet-hidden");
                    }
                });
            };

            self.awake = function() {
                console.log("Loged Screen Awakened");
                
                MAP.check_session(function(data) {
                    iris.userId = data.result.id;
                    iris.userName = data.result.name;
                    iris.userImage = data.result.image;

                    if (data.status !== "ok") {
                        iris.navigate("#/unloged");
                    }
                    iris.notify("render", false);
                     ifUpdateMarkers();
                });
                
               


                function ifUpdateMarkers() {
                    EVENTS.lastUpdateDate(function(data) {
                        if (data.status === "ok") {
                            console.log(data);
                            MAP.renderMap();
                            iris.updateDate = data.result;
                        }
                        setTimeout(ifUpdateMarkers, 1000);
                    })
                }



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

            
        },
        iris.path.screen.loged.js
        );