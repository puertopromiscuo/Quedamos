<?php

include_once '../utils/conection.php';
if (!$link) {
    $link = getConection();
}

function getEvent($event_id) {
    global $link;
    $query = "SELECT * from " . SQL_EVENTTABLE . " where event_id='$event_id'";
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
    $query = "INSERT into " . SQL_EVENTTABLE . " (event_title,event_description,event_date,user_id,point_id) values ('$event_title','$event_description','$event_date','$user_id','$point_id')";    
    $result = mysqli_query($link, $query);
    if (!$result) {
        $message = 'Invalid query: ' . mysqli_error() . "\n";
        die($message);
    }
    /* retornar el ultimo insertado */
    $event_id = mysqli_insert_id($link);
    return getEvent($event_id);
}

function deleteEvent($event_id) {
    global $link;
    $query = "DELETE from " . SQL_EVENTTABLE . " where event_id='$event_id'";
    mysqli_query($link, $query);
    if (mysqli_affected_rows($link)!==1) {        
        die("error al borrar evento");
    }    
    return true;    
}

?>