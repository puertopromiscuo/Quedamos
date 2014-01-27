<?php

include '../utils/conection.php';
$link = getConection();
define("TABLE", "events");

function getEvent($event_id) {
    global $link;
    $query = "SELECT * from " . TABLE . " where event_id='$event_id'";
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

function insertEvent($event_title, $event_description, $event_date, $user_id, $point_id) {
    global $link;
    $query = "INSERT into " . TABLE . " (event_title,event_description,event_date,user_id,point_id) values ('$event_title','$event_description','$event_date','$user_id','$point_id')";
    $result = mysqli_query($link, $query);
    if (!$result) {
        $message = 'Invalid query: ' . mysqli_error() . "\n";
        die($message);
    }
    /* retornar el ultimo insertado */
    $event_id = mysqli_insert_id($link);
    return getEvent($event_id);
}

/* TEST */
//var_dump(getPoint(15));
var_dump(insertEvent("titulo", "descripcion", '2014-12-10', '10', '20'));
?>