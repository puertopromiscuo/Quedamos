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
        },
        iris.path.ui.register.js
        );

function sendRegister() {
    var formRegister = $('#register-content');
    $.ajax({
        type: 'POST',
        url: 'servidor/services/loginService/insertUser',
        dataType: 'json',
        data: {
            name: formRegister.find('input[name = user-name]').val(),
            email: formRegister.find('input[name = user-email]').val(),
            password: formRegister.find('input[name = user-password]').val()}
    }).done(function(data) {
        viewRegister(data);
        console.log(data);
    }).fail(function() {
        console.log(arguments);
    });
}

function logSend() {
    var formLogin = $('#login-content');
    $.ajax({
        type: 'POST',
        url: 'servidor/services/loginService/logUser',
        dataType: 'json',
        data: {
            email: formLogin.find('input[name = user-email]').val(),
            password: formLogin.find('input[name = user-password]').val()}
    }).done(function(data) {
        renderUser(data);
    }).fail(function() {
        console.log(arguments);
    });
}

function forgetPass() {
        var formForget = $('#forget-content');
        $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/forgetPass',
            dataType: 'json',
            data: {
                email: formForget.find('input[name = user-email]').val()}
        }).done(function(data) {
            console.log(data);
            viewRegister(data);
        }).fail(function() {
            console.log(arguments);
        });
    }

function viewFormForgetPass() {
    $('#myTab').find('li[class=active]').removeClass('active');
    $('#login-content').removeClass('active');
    $('#register-content').removeClass('active');

    $('#forget-content').addClass('active');
}

function viewRegister(dataRegister) {
    if (dataRegister.status === "ok") {
        $('#ok-form').html(dataRegister.message);
        $('#ok-form').removeClass('hidden');
        $('#error-form').addClass('hidden');
        //Limpiar campos del formulario
        $(':input', '#register-content').val('');
    } else if (dataRegister.status === "error") {
        $('#error-form').html(dataRegister.message);
        $('#error-form').removeClass('hidden');
    } else {
        console.log("Error al registrar el usuario, intentelo más tarde.");
    }
}

function renderUser(dataUser) {
    if (dataUser.status == "error") {
        $('#error-form').html(dataUser.message);
        $('#error-form').removeClass('hidden');
    } else {
        iris.navigate("#/loged");
        var $userName = $('<p/>', {
            html: dataUser.result.name,
            href: '#user'
        });
        $userName.appendTo('#menu-top');
    }
}
