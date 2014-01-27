$(function() {
    $(document).ready(function() {
        check_session(function(data) {
            if (data.status === "ok") {
                //Estas logeado
                renderUser(data);
            } else {
                //No estas logeado
                $('#login-content').removeClass('hidden');
                $('#map-canvas').addClass('hidden');
            }
        });
    });



    /***********************ONClick de login y registor******************************/


    var formRegister = $('#register-content');
    var formLogin = $('#login-content');
    
    
    
    $('#login-submit').click(function() {
        logSend();
    });

    $('#register-submit').click(function() {
        sendRegister();
    });

    $('#view-forget-pass').click(function() {
        viewForgetPass();
    });

    $('#forget-pass').click(function() {
        forgetPass();
    });

    Ladda.bind('.button-demo button', {timeout: 2000});





    /*FUNCIONES*/
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

    function sendRegister() {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/insertUser',
            dataType: 'json',
            data: {
                name: formRegister.find('input[name = user-name]').val(),
                email: formRegister.find('input[name = user-email]').val(),
                password: formRegister.find('input[name = user-password]').val()}
        }).done(function(data) {
            //$('#error-form').html();
            viewRegister(data);
            console.log(data);
        }).fail(function() {
            console.log("error", arguments);
        });
    }

    function logSend() {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/logUser',
            dataType: 'json',
            data: {
                email: formLogin.find('input[name = log-email]').val(),
                password: formLogin.find('input[name = log-password]').val()}
        }).done(function(data) {
            $('#error-login').html(data);
            //Cambio de interfaz
            renderUser(data);
        }).fail(function() {
            console.log("error", arguments);
        });
    }

    function forgetPass() {
        $.ajax({
            type: 'POST',
            url: 'servidor/services/loginService/forgetPass',
            dataType: 'json',
            data: {
                email: formRegister.find('input[name = user-email]').val()}
        }).done(function(data) {
            $('#error-form').html(data);
            console.log(data);
            viewRegister(data);
        }).fail(function() {
            console.log("error", arguments);
        });
    }



    /*********************Resto de funciones**********************************/
    function renderUser(dataUser) {
        if (dataUser.status == "error") {
            $('#error-login').html(dataUser.message);
            $('#error-login').removeClass('hidden');
        } else {
            var $userName = $('<p/>', {
                html: dataUser.result.name,
                href: '#user'
            });
            $userName.appendTo('#menu-top');

            loadDiv('#profile', 'cliente/html/modal-profile.txt');

            $('#login-content').addClass('hidden');
            $('#error-login').addClass('hidden');
            $('#menu-top').removeClass('hidden');

            $('#map-canvas').removeClass('hidden');

            //Si se puede cambiiar el nombre hay que volver a comprobarlo en la base de datos
            if ($('#profile-content').length > 0) {
                console.log("true");
            } else {
                console.log("false");
            }
            console.log($('#profile-content').find('input[name = profile-name]'));

        }
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
});