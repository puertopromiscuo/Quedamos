$(function() {
    $(document).ready(function() {
        check_session(function(data) {
            if (data.status === "ok") {
                debugger;
                //Estas logeado
                viewUser(data.result);
            } else {
                //No estas logeado
                $('#login-content').removeClass('hidden');
                $('#map-canvas').addClass('hidden');
            }
        });
    });

    function check_session(callback) {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/checkSession',
            dataType: 'json'
        }).done(function(data) {
            console.log(data.status);
            callback(data);
        }).fail(function() {
            //console.log("error", arguments);
        });
    }


    /***********************ONClick de login y registor******************************/
    var formRegister = $('#register-content');
    var formLogin = $('#login-content');
    $('#login-submit').click(function() {
        logSend();
    });

    $('#register-submit').click(function() {
        regSend();
    });

    $('#view-forget-pass').click(function() {
        viewForgetPass();
    });

    $('#forget-pass').click(function() {
        forgetPass();
    });

    Ladda.bind('.button-demo button', {timeout: 2000});

    /*FUNCIONES*/
    function regSend() {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/insertUser',
            dataType: 'text',
            data: {
                name: formRegister.find('input[name = user-name]').val(),
                email: formRegister.find('input[name = user-email]').val(),
                password: formRegister.find('input[name = user-password]').val()}
        }).done(function(data) {
            $('#error-form').html();
            viewRegUser(data);
        }).fail(function() {
            console.log("error", arguments);
        });
    }

    function logSend() {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/logUser',
            dataType: 'text',
            data: {
                email: formLogin.find('input[name = log-email]').val(),
                password: formLogin.find('input[name = log-password]').val()}
        }).done(function(data) {
            $('#error-login').html(data);
            //Cambio de interfaz
            viewUser(data);
        }).fail(function() {
            console.log("error", arguments);
        });
    }

    function forgetPass() {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/forgetPass',
            dataType: 'text',
            data: {
                email: formRegister.find('input[name = user-email]').val()}
        }).done(function(data) {
            $('#error-form').html(data);
            console.log(data);
            viewRegUser(data, "forgetPass");
        }).fail(function() {
            console.log("error", arguments);
        });
    }



    /*********************Resto de funciones**********************************/
    function viewUser(dataUser) {
        if (dataUser == 2) {
            $('#error-login').html("El usuario no esta activado revise su email.");
            $('#error-login').removeClass('hidden');
        } else if (dataUser == 3) {
            $('#error-login').html("Los datos introducidos no son correctos.");
            $('#error-login').removeClass('hidden');

        } else if (dataUser) {
            var $userName = $('<p/>', {
                html: dataUser.name,
                href: '#user'
            });
            $userName.appendTo('#menu-top');

            $('#login-content').addClass('hidden');
            $('#error-login').addClass('hidden');
            $('#menu-top').removeClass('hidden');

            $('#map-canvas').removeClass('hidden');

            userProfile();
            //Si se puede cambiiar el nombre hay que volver a comprobarlo en la base de datos
            if ($('#profile-content').length > 0) { console.log("true"); } else { console.log("false");}
           
        }
    }

    function viewRegUser(txt_reg, type_operator) {
        debugger;

        if (txt_reg == 1) {
            $('#ok-form').html("Hemos enviado un mensaje de activación a su direccion de correo electrónico.");
            $('#ok-form').removeClass('hidden');
            $('#error-form').addClass('hidden');
            //Limpiar campos del formulario
            $(':input', '#register-content').val('');
        } else if (txt_reg) {
            $('#error-form').html(txt_reg);
            $('#error-form').removeClass('hidden');
        } else {
            console.log("Error al registrar el usuario, intentelo más tarde.");
        }

        if (type_operator) {
            if (txt_reg) {
                $('#error-form').html(txt_reg);
                $('#error-form').removeClass('hidden');
            } else {
                $('#error-form').html("Recibiras un email con tus datos de configuración.");
                $('#error-form').removeClass('hidden');
                $('#error-form').removeClass('alert-danger');
                $('#error-form').addClass('alert-success');
                $(':input', '#register-content').val('');
            }
        }
    }

    function viewForgetPass() {
        //Generar nuevo formulario de olvido de contraseña
        $('#modal-title').html('Introduce su email para recuperar la contraseña: ');

        formRegister.find('input[name = user-name]').parent().addClass('hidden');
        formRegister.find('input[name = user-password]').parent().addClass('hidden');
        formRegister.find('#register-submit').parent().addClass('hidden');
        formRegister.find('#view-forget-pass').addClass('hidden');

        $(':input', '#register-content').val('');
        formRegister.find('#forget-pass').removeClass('hidden');
    }

    function loadHtml(html) {
        $('html').load('index.html');
    }

    function loadDiv(place, item) {
        $(place).load(item);
    }

    function userProfile() {
        loadDiv('#profile', './cliente/html/modal-profile.html');
    }
});