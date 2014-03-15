iris.ui(
        function(self) {
            self.create = function() {
                console.log("register UI Created");
                self.tmpl(iris.path.ui.register.html);
                self.get("register-submit").click(
                        function() {
                            sendRegister();
                        }
                );
                self.get("login-submit").click(
                        function() {
                            logSend();
                        }
                );
                self.get("forget-pass").click(
                        function() {
                            viewFormForgetPass();
                        }
                );
                self.get("forget-submit").click(
                        function() {
                            forgetPass();
                        }
                );

            };
            self.awake = function() {
                console.log("register UI Awakened");
            };
            self.sleep = function() {
                console.log("register UI Asleep");
            };

            self.destroy = function() {
                console.log("register UI Destroyed");
            };

            function sendRegister() {
                var formRegister = $('#register-content');
                var name = formRegister.find('input[name = user-name]').val();
                var email = formRegister.find('input[name = user-email]').val();
                var password = formRegister.find('input[name = user-password]').val();
                if (validateFormRegister(name, email, password)) {
                    play();
                    $.ajax({
                        type: 'POST',
                        url: 'servidor/services/loginService/insertUser',
                        dataType: 'json',
                        data: {
                            name: formRegister.find('input[name = user-name]').val(),
                            email: formRegister.find('input[name = user-email]').val(),
                            password: formRegister.find('input[name = user-password]').val()}
                    }).done(function(data) {
                        if (data.status === "error") {
                            showFormAlert(data.message, false);
                        } else if (data.status === "ok") {
                            showFormAlert(data.message, true);
                        }
                        stop();
                        console.log(data);
                    }).fail(function() {
                        stop();
                        data = {
                            status: "error",
                            message: "Email no existente."
                        }
                        console.log(data);
                        showFormAlert(data.message, false);
                    });
                }
            }

            function logSend() {
                var formLogin = $('#login-content');
                var email = formLogin.find('input[name = user-email]').val();
                var password = formLogin.find('input[name = user-password]').val();
                if (validateFormLogin(email, password)) {
                    play();
                    $.ajax({
                        type: 'POST',
                        url: 'servidor/services/loginService/logUser',
                        dataType: 'json',
                        data: {
                            email: formLogin.find('input[name = user-email]').val(),
                            password: formLogin.find('input[name = user-password]').val()}
                    }).done(function(data) {
                        if (data.status === "error") {
                            showFormAlert(data.message, false);
                        } else if (data.status === "ok") {
                            showFormAlert(data.message, true);
                        }
                        stop();
                        console.log(data);
                        renderUser(data);
                    }).fail(function() {
                        console.log(arguments);
                    });
                }
            }

            function validateFormRegister(name, email, password) {
                var regExpEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var regExpUserName = /^[a-zA-Z]{5,20}$/;
                var regExpPassword = /^[a-zA-Z0-9!@#$%^&*]{5,20}$/;
                if (!name || !password || !email) {
                    showFormAlert("Todos los campos son obligatorios", false);
                    return false;
                }
                if (!regExpEmail.test(email)) {
                    showFormAlert("Email invalido", false);
                    return false;
                }
                if (!regExpUserName.test(name)) {
                    showFormAlert("Nombre de usuario invalido (5-20 letras)", false);
                    return false;
                }
                if (!regExpPassword.test(password)) {
                    showFormAlert("Contraseña invalida (5-20 letras, numeros o !@#$%^&*)", false);
                    return false;
                }
                return true;
            }

            function validateFormLogin(email, password) {
                var regExpEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var regExpPassword = /^[a-zA-Z0-9!@#$%^&*]{5,20}$/;
                if (!password || !email) {
                    showFormAlert("Todos los campos son obligatorios", false);
                    return false;
                }
                if (!regExpEmail.test(email)) {
                    showFormAlert("Email invalido", false);
                    return false;
                }
                if (!regExpPassword.test(password)) {
                    showFormAlert("Contraseña invalida (5-20 letras, numeros o !@#$%^&*)", false);
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



            function forgetPass() {
                var formForget = $('#forget-content');
                play();
                $.ajax({
                    type: 'POST',
                    url: 'servidor/services/loginService/forgetPass',
                    dataType: 'json',
                    data: {
                        email: formForget.find('input[name = user-email]').val()}
                }).done(function(data) {
                    console.log(data);
                    if (data.status === "error") {
                        showFormAlert(data.message, false);
                    } else if (data.status === "ok") {
                        showFormAlert(data.message, true);
                    }
                    stop();
                }).fail(function() {
                    console.log(arguments);
                    stop();
                });
            }

            function viewFormForgetPass() {
                $('#myTab').find('li[class=active]').removeClass('active');
                $('#login-content').removeClass('active');
                $('#register-content').removeClass('active');

                $('#forget-content').addClass('active');
            }




            function renderUser(dataUser) {
                if (dataUser.status == "error") {
                    $('#error-form').html(dataUser.message);
                    $('#error-form').removeClass('hidden');
                } else {
                    $('#close').click();
                    iris.navigate("#/loged");
                    var $userName = $('<p/>', {
                        html: dataUser.result.name,
                        href: '#user'
                    });
                    $userName.appendTo('#menu-top');
                }
            }
            function loaged() {
                var circle = new Sonic({
                    width: 50,
                    height: 50,
                    padding: 50,
                    strokeColor: '#000',
                    pointDistance: .01,
                    stepsPerFrame: 3,
                    trailLength: .7,
                    step: 'fader',
                    setup: function() {
                        this._.lineWidth = 5;
                    },
                    path: [
                        ['arc', 25, 25, 25, 0, 360]
                    ]

                });
                return circle;

            }
            function play() {
                var circle = loaged();
                circle.play();
                $('#load-loaded').append(circle.canvas);
            }
            function stop() {
                var circle = loaged();
                circle.stop();
                $('#load-loaded').html("");
            }
        },
        iris.path.ui.register.js
        );

