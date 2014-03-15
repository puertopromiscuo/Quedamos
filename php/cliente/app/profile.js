iris.ui(
        function(self) {
            self.create = function() {
                console.log("profile UI Created");
                self.tmpl(iris.path.ui.profile.html);
                
                self.get("profile-submit").click(function(){
                        var pass1 = self.get("profile-old-password").val();
                        var pass2 = self.get("profile-new-password").val();
                        EVENTS.updatePassProfile(EVENTS.getUserId(),pass1,pass2,function(data){
                            console.log(data);
                        })
                })
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