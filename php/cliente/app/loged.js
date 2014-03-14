iris.screen(
        function(self) {
            self.create = function() {
                console.log("Loged Screen Created");

                self.tmpl(iris.path.screen.loged.html);
                self.ui("modal-profile", iris.path.ui.profile.js);
                self.ui("map-container", iris.path.ui.map.js);
                self.ui("panel-container", iris.path.ui.panel.js);

                iris.updateDate = "2014-00-00 00:00:00";
                
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
                    });
                    iris.navigate("#/unloged");
                });
                
            };

            self.awake = function() {
                console.log("Loged Screen Awakened");
                check_session(function(data) {
                    iris.userId = data.result.id;
                    iris.userName = data.result.name;
                    iris.userImage = data.result.image;
                    
                    if (data.status !== "ok") {
                        iris.navigate("#/unloged");
                    }
                    iris.notify("render",false);
                });
                
               setInterval(function(){
                EVENTS.lastUpdateDate(function(data){
                   console.log(iris.updateDate);
                   console.log(data);
                   if(data.status === "ok"){
                       MAP.renderMap();
                       iris.updateDate = data.result;
                   }
                   console.log(iris.updateDate);
               })
               },2000);
               /*setInterval(function(){
                    MAP.earNewEvent();
                },3000);*/
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