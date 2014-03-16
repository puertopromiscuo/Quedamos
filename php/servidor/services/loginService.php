<?php
require("../manager/loginManager.php");
require("../../lib/toro/toro.php");


header('Content-Type: application/json; charset=utf-8');

class InsertUser {

    function post() {
        echo insertUserManager ($_POST['name'], $_POST['email'], $_POST['password']);
    }

}

class LogUser {

    function post() {
        echo logUserManager ($_POST['email'], $_POST['password']);
    }

}

class ActivateUser {

    function get($code) {
        activateUserManager ($code);
    }

}

class ForgetPass {

    function post() {
        echo forgetPassManager($_POST['email']);
    }

}

class CheckSession {

    function post() {
        echo checkSessionManager();
    }

}

class LogOut{
    function post(){
        echo logOutManager();
    }
}

class UpdateProfile{
    function post(){
        updateProfileManager($_POST['archivo']);
    }
}

class UpdateDataUser{
    function post(){
        echo updateDataUserManager($_POST['user_id'], $_POST['user_pass'],$_POST['user_pass2'],$_POST['user_img']);
    }
}

Toro::serve(array(
    "/insertUser" => "InsertUser",
    "/logUser" => "LogUser",
    "/activate/([a-zA-Z0-9-_]+)" => "ActivateUser",
    "/forgetPass" => "ForgetPass",
    "/checkSession" => "CheckSession",
    "/logOut" => "LogOut",
    "/updateProfile" => "UpdateProfile",
    "/updateDataUser" => "UpdateDataUser"
));


?>
