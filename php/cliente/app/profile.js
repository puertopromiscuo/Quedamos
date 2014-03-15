iris.ui(
        function(self) {
            self.create = function() {
                console.log("profile UI Created");
                self.tmpl(iris.path.ui.profile.html);

                self.get("profile-submit").click(function() {
                    var pass1 = self.get("profile-old-password").val();
                    var pass2 = self.get("profile-new-password").val();
                    if (validateFormProfile(pass1, pass2)) {
                        EVENTS.updatePassProfile(EVENTS.getUserId(), pass1, pass2, function(data) {
                            if (data.status === "error") {
                                showFormAlert(data.message, false);
                            } else if (data.status === "ok") {
                                showFormAlert(data.message, true);
                            }                         
                        })
                    }

                })
            };

            self.awake = function() {
                console.log("profile UI Awakened");
                EVENTS.checkSession(function(data) {
                    self.get('name').attr("placeholder", data.name);
                    self.get("user-image").attr("src", "img/userImage/" + data.image + ".png");
                });
            };
            self.sleep = function() {
                console.log("profile UI Asleep");
            };

            self.destroy = function() {
                console.log("profile UI Destroyed");
            };



            function validateFormProfile(pass1, pass2) {
                var regExpPassword = /^[a-zA-Z0-9!@#$%^&*]{5,20}$/;
                if (!pass1 || !pass2) {
                    showFormAlert("Todos los campos son obligatorios", false);
                    return false;
                }
                if (!regExpPassword.test(pass1)) {
                    showFormAlert("Contraseña antigua invalida (5-20 letras, numeros o !@#$%^&*)", false);
                    return false;
                }
                if (!regExpPassword.test(pass2)) {
                    showFormAlert("Contraseña nueva invalida (5-20 letras, numeros o !@#$%^&*)", false);
                    return false;
                }
                return true;
            }
            function showFormAlert(message, status) {
                if (status) {
                    self.get("success-form").show().removeClass("hidden").text(message).fadeOut(3000);
                } else {
                    self.get("error-form").show().removeClass("hidden").text(message).fadeOut(3000);
                }
            }
        },
        iris.path.ui.profile.js
        );