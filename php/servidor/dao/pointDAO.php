<?php

include '../utils/conection.php';
$link = getConection();
define("TABLE", "points");

function getPoint($point_id) {
    global $link;
    $query = "SELECT * from " . TABLE . " where point_id='$point_id'";
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
    $query = "INSERT into " . TABLE . " (point_x,point_y) values ('$point_x','$point_x')";
    $result = mysqli_query($link, $query);
    if (!$result) {
        $message = 'Invalid query: ' . mysqli_error() . "\n";
        die($message);
    }
    /* retornar el ultimo insertado */
    $point_id = mysqli_insert_id($link);
    return getPoint($point_id);
}

/* TEST */
//var_dump(getPoint(15));
var_dump(insertPoint("654654", "546456465"));
?>

