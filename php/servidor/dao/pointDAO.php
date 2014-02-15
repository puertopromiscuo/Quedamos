<?php

include_once '../utils/conection.php';
if (!$link) {
    $link = getConection();    
}

function getPoint($point_id) {
    global $link;
    $query = "SELECT * from " . SQL_POINTTABLE . " where point_id='$point_id'";
    $result = mysqli_query($link, $query);
    if (!$result) {
        $message = 'Invalid query: ' . mysqli_error() . "\n";
        die($message);
    }
    $data = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        array_push($data, $row);
    }
    return $data;
}

function insertPoint($point_x, $point_y) {
    global $link;
    $query = "INSERT into " . SQL_POINTTABLE . " (point_x,point_y) values ('$point_x','$point_y')";
    $result = mysqli_query($link, $query);
    if (!$result) {
        $message = 'Invalid query: ' . mysqli_error() . "\n";
        die($message);
    }
    /* retornar el ultimo insertado */
    $point_id = mysqli_insert_id($link);
    return getPoint($point_id);
}

function deletePoint($point_id) {
    global $link;
    $query = "DELETE from " . SQL_POINTTABLE . " where point_id='$point_id'";
    mysqli_query($link, $query);
    if (mysqli_affected_rows($link)!==1) {        
        die("error al borrar punto");
    }    
    return true;    
}


?>

