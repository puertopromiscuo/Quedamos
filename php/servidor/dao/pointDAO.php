<?php

include '../utils/conection.php';
include '../utils/json.php';

class Point {

    var $point_id;
    var $point_x;
    var $point_y;

    function __construct($point_id = "", $point_x = "", $point_y = "") {
        $this->point_id = $point_id;
        $this->point_x = $point_x;
        $this->point_y = $point_y;
    }

    static function getPoint($point_id) {
        $query = "SELECT point_id,point_x,point_y from " . SQL_POINTTABLE . " where point_id='$point_id'";
        $result = mysqli_query( getConection(),$query);
        if (!$result) {
            $message = 'Invalid query: ' . mysqli_error() . "\n";
            die($message);
        }
        if (mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_assoc($result);
            $point = new Point($row['point_id'], $row['point_x'], $row['point_y']);
            return createJson("ok", "punto recuperado", $point);
        } else {
            return createJson("error", "punto no existe o duplicado", null);
        }
    }

    static function getAllPoints() {
        $allPoints = array();
        $query = "SELECT point_id,point_x,point_y from " . SQL_POINTTABLE;
        $result = mysqli_query( getConection(),$query);
        if (!$result) {
            $message = 'Invalid query: ' . mysqli_error() . "\n";
            die($message);
        }
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_array($result)) {
                $point = new Point($row['point_id'], $row['point_x'], $row['point_y']);
                array_push($allPoints, $point);                
            }
             return createJson("ok", "puntos recuperados", $allPoints);
        } else {
            return createJson("error", "no hay puntos", null);
        }
    }

    static function insertPoint($point_x, $point_y) {
        //INSERTAR
        $query = "INSERT into " . SQL_POINTTABLE . " (point_x,point_y) values ('$point_x','$point_x')";
        $result = mysqli_query( getConection(),$query);
        if (!$result) {
            $message = 'Invalid query: ' . mysqli_error() . "\n";
            die($message);
        }

        //RETORNAR EL ULTIMO INSERTADO
        $point_id = mysqli_insert_id(); //ultimo id insertado
        $query = "SELECT point_id,point_x,point_y from " . SQL_POINTTABLE . " where point_id='$point_id'";
        $result = mysqli_query( getConection(),$query);
        if (!$result) {
            $message = 'Invalid query: ' . mysqli_error() . "\n";
            die($message);
        }
        $row = mysqli_fetch_assoc($result);
        $point = new Point($row['point_id'], $row['point_x'], $row['point_y']);
        return $point;
    }

    static function updatePoint($point_id, $point_x, $point_y) {
        $query = "UPDATE " . SQL_POINTTABLE . " set point_x = $point_x ,point_y = $point_y where point_id='$point_id'";
        $result = mysqli_query( getConection(),$query);
        if (!$result) {
            $message = 'Invalid query: ' . mysqli_error() . "\n";
            die($message);
        }
        $point = new Point($point_id, $point_x, $point_y);
        return $point;
    }

    static function deletePoint($point_id) {
        //GUARDAR PUNTO ANTES DE BORRARLO
        $query = "SELECT point_id,point_x,point_y from " . SQL_POINTTABLE . " where point_id='$point_id'";
        $result = mysqli_query( getConection(),$query);
        if (!$result) {
            $message = 'Invalid query: ' . mysqli_error() . "\n";
            die($message);
        }
        $row = mysqli_fetch_assoc($result);
        $point = new Point($row['point_id'], $row['point_x'], $row['point_y']);

        //BORRAR PUNTO
        $query = "DELETE from " . SQL_POINTTABLE . " where point_id='$point_id'";
        $result = mysqli_query( getConection(),$query);
        if (!$result) {
            $message = 'Invalid query: ' . mysqli_error() . "\n";
            die($message);
        }
        return $point;
    }

}
?>

