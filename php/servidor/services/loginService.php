<?php

require("../../lib/toro/toro.php");
require("../dao/loginDAO.php");
require("../dao/sessionDAO.php");

header('Content-Type: application/json; charset=utf-8');

class InsertUser {

    function post() {
        echo insertUser($_POST['name'], $_POST['email'], $_POST['password']);
    }

}

class LogUser {

    function post() {
        echo logUser($_POST['email'], $_POST['password']);
    }

}

class ActivateUser {

    function get($code) {
        activateUser($code);
    }

}

class ForgetPass {

    function post() {
        echo forgetPass($_POST['email']);
    }

}

class CheckSession {

    function post() {
        if(checkSession() != 0){
            echo dataUser(checkSession());
        }else{
            echo createJson("error", "Ningun usuario logeado", "sin usuario");
        }
    }

}

Toro::serve(array(
    "/insertUser" => "InsertUser",
    "/logUser" => "LogUser",
    "/activate/([a-zA-Z0-9-_]+)" => "ActivateUser",
    "/forgetPass" => "ForgetPass",
    "/checkSession" => "CheckSession"
));
?>
