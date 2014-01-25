<?php
require 'config.php';

$link = false;

function getConection() {
    global $link;
    if($link){
        return $link;//si ya existe la retorna
    }
    $link = mysqli_connect(SQL_HOSTNAME,SQL_USER,SQL_PASS, SQL_DBNAME);    
    /*mysql_select_db(SQL_DBNAME) or die('Error al seleccionar Base de Datos.');
    if (!$link){
        die('<br>Error en la conexion: ' . mysql_error() . "<br>");
    } */   
    return($link);
}
function closeConection($con){
    global $link;
    if( $link != false ){
        mysql_close($link);
    }
    $link = false;
}
?>
