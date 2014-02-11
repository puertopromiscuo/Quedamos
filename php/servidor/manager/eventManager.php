<?php

include '../dao/eventDAO.php';
include '../dao/pointDAO.php';
include_once '../utils/conection.php';
include_once '../utils/json.php';
if (!$link) {
    $link = getConection();
}

function insertEventManager($event_title, $event_description, $event_date, $user_id, $point_x, $point_y) {
    
    $point = insertPoint($point_x, $point_y);
    $point_id = $point[0]['point_id'];//retorna el id insertado
    
    $event = insertEvent($event_title, $event_description, $event_date, $user_id, $point_id);
    $event_id = $event[0]['event_id'];
    
    return getEventManager($event_id);
}
function getEventManager($event_id){
    global $link;
    $query = "SELECT * from VeventPoint where event_id='$event_id'";    
    $result = mysqli_query($link, $query);    
    $data = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        array_push($data, $row);
    }
    return $data;    
}

function getAllEventsManager(){
    global $link;
    $query = "SELECT * from VeventPoint";    
    $result = mysqli_query($link, $query);    
    $data = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        array_push($data, $row);
    }    
    if(count($data) > 0){
        return createJson("ok","eventos recuperados", $data);
    }else{
        return createJson("error","no hay eventos", $data);
    }
}




?>

