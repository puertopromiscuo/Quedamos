<?php

require("../dao/loginDAO.php");
require("../dao/sessionDAO.php");
include '../utils/json.php';

/*
 * INSERTAR USUARIO
 * LOGER USUARIO
 * ACTIVATE USUARIO
 * RECORDAR CONTRASEÑA
 * COMPROBAR SESION
 * 
 */

function insertUserManager($name, $email, $password) {
    if (insertUser($name, $email, $password)) {
        return createJson("error", insertUser($name, $email, $password), "error");
    } else {
        return createJson("ok", "Hemos enviado un mensaje de activación a su direccion de correo electrónico.", "ok");
    }
}

function logUserManager($email, $password) {
    //SI DEVUELVE UN NUMERO ES CORRECTO YA NOS DEVULVE EL ID, SINO ES UN ERROR
    if (is_numeric(logUser($email, $password))) {
        return createJson("ok", "Te has logeado correctamente",  dataUser(logUser($email, $password)));
    } else {
        return createJson("error", logUser($email, $password), "error");
    }
}

function activateUserManager($code) {
    activateUser($code);
}

function forgetPassManager($mail) {
    if (forgetPass($mail)) {
        return createJson("ok", "Recibiras un email con tus datos de configuración", forgetPass($mail));
    } else {
        return createJson("error", "No hay ningún usuario registrado con ese email.", "error");
    }
}

function checkSessionManager() {
    if (checkSession()) {
        return createJson("ok", "Informacion del usuario", dataUser(checkSession()));
    } else {
        return createJson("error", "No hay ninguna sesión iniciada", "error");
    }
}


function logOutManager() {
    if (logOut()) {
        return createJson("ok", "Session terminada","ok" );
    } else {
        return createJson("error", "No hay ninguna sesión iniciada", "error");
    }
}


function updateProfileManager($img){
    if (updateDataUser1($img)) {
        return createJson("ok", "Imagen actualizada","ok" );
    } else {
        return createJson("error", "Error al actualizar el eperfil", "error");
    }
}

function updateDataUserManager($id, $pass1, $pass2,$img){
    if (updateDataUser($id, $pass1, $pass2,$img)) {
        return createJson("ok", "Contraseña actualizada","ok" );
    } else {
        return createJson("error", "Error al actualizar el perfil", "error");
    }
}

//var_dump(checkSessionManager());