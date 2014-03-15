<?php

//ESTE ARCHIVO MANEJA LA SESION DEL USUARIO
session_start();

//ARCHIVOS REQUERIDOS
require("../utils/sqlFunctions.php");
require('../utils/sendMail.php');
require('../utils/encrypter.php');


//CONEXIÓN COMO GLOBAL
$db = getConnection();

//FUNCIONES DE USUARIO
function insertUser($name, $email, $password) {
    global $db;
    $pass = Encrypter::encrypt($password);
    if (mysqli_num_rows(get_data('user_name', $name)) === 0) {
        if (mysqli_num_rows(get_data('user_email', $email)) === 0) {
            $code = createToken();
            $cuerpo = 'Hola ' . $name . ', para activar tu cuenta haz click en el siguiente link:
                            ' . "\n" . '
                            <a href="http://http://localhost/git/GoogleMaps/Mapa,buscarNombre/activar.html?code=' . $code . '">http://localhost/git/GoogleMaps/Mapa,buscarNombre/activar.html?code=' . $code . '</a>
                            O copia el siguiente link en la barra de direcciones de tu navegador:
                            ' . "\n" . '
                            http://localhost/github/quedamos/php/servidor/services/loginService/activate/' . $code;

            if (send_mail($email, $cuerpo)) {
                $user_image = rand(1, 10);
                $query = "INSERT into " . SQL_USERTABLE . " (user_name,user_email,user_password,user_state,user_image) values('$name','$email','$pass','$code','$user_image')";
                $result = mysqli_query($db, $query);
                return false;
            } else {
                return "El email introducido no es válido.";
            }
        } else {
            return "El email ya esta en uso";
        }
    } else {
        return "El nombre ya esta en uso.";
    }
}

function logUser($email, $password) {
    global $db;
    $pass = Encrypter::encrypt($password);
    $query = "SELECT * FROM " . SQL_USERTABLE . " WHERE user_email='$email' and user_password='$pass'";
    $result = mysqli_query($db, $query);
    $row = mysqli_fetch_array($result);

    $user_state = $row['user_state'];

    if (mysqli_num_rows($result) != 0) {
        if ($user_state == 'activate') {
            //LOGEADO E INICIO DE LA SESIÓN
            $_SESSION['user_name'] = $row['user_name'];
            $_SESSION['user_id'] = $row['user_id'];
            return $row['user_id'];
        } else {
            return "El usuario no esta activo"; //Error: El usuario no esta activo.
        }
    } else {
        return "Los datos no son correctos"; //Error: Los datos no son correctos.
    }
}

function activateUser($code) {
    global $db;
    $query = "SELECT * FROM " . SQL_USERTABLE . " WHERE user_state='$code'";
    $result = mysqli_query($db, $query);
    if ($result) {
        $row = mysqli_fetch_array($result);
        $query_state_ok = "UPDATE " . SQL_USERTABLE . " SET user_state='activate' WHERE user_name='" . $row['user_name'] . "'";
        mysqli_query($db, $query_state_ok);
        //NOS REDIRIGE AL INDEX,Y COMO PARAMETROS MANDAMOS EL USUARIO ACTIVO
        header('Location: /github/pruebas/php/#/loged');
        return $row['user_name'] . " ha sido activado.";
    }
}

function createToken() {
    //Se genera en funcion del nombre, no puede haber dos nombres iguales
    return sha1(mt_rand() . time() . mt_rand() . $_SERVER['REMOTE_ADDR']);
}

function get_data($campo, $var_campo) {
    global $db;
    $query = "SELECT * FROM " . SQL_USERTABLE . " WHERE $campo='$var_campo'";
    $result = mysqli_query($db, $query);
    return $result;
}

function forgetPass($mail) {
    if (mysqli_num_rows(get_data('user_email', $mail)) === 0) {
        return false;
    } else {
        $content_user_data = mysqli_fetch_array(get_data('user_email', $mail));
        $cuerpo = "Hola " . $content_user_data['user_name'] . ":<br><br>Tu contraseña es  " . Encrypter::decrypt($content_user_data['user_password']) . "<br><br> Gracias por confiar en Quedamos";
        send_mail($mail, $cuerpo);
        return $content_user_data['user_name'];
    }
}

function updateDataUser($id, $pass1, $pass2) {
    global $db;
    $pass = Encrypter::encrypt($pass1);
    $pass2 = Encrypter::encrypt($pass2);
    $query = "SELECT * FROM " . SQL_USERTABLE . " WHERE user_id='$id'";
    $result = mysqli_query($db, $query);
    $row = mysqli_fetch_array($result);
    if ($row['user_password'] != $pass) {
        return false;
    } else {
        $query = "UPDATE " . SQL_USERTABLE . " SET user_password='$pass2' WHERE user_id='$id'";
        $result = mysqli_query($db, $query);
        if ($result) {
            return true;
        } else {
            return false;
        }
    }
}

//var_dump(updateDataUser(118, 1, 2));
//var_dump(insertUser(2, "jesusgraficap@gmail.com" ,2));
//var_dump(activateUser("627d79a86b13815ef5fb9731c491f400348151e7"));
?>