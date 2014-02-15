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
       
    $data = getEventManager($event_id);  
    if(count($data) == 1){
        return createJson("ok","evento creado", $data);
    }else{
        return createJson("error","error al crear evento", $data);
    }  
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
function getEventsWhereManager($where=false){    
    global $link;
    $query = "SELECT * from VeventPoint";       
    if($where){
        $query .= " where ".$where;                
    } 
    $query .= " order by event_date desc ";        
    
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

function deleteEventManager($event_id){
    global $link;
    $query = "SELECT * from VeventPoint where event_id='$event_id'";    
    $result = mysqli_query($link, $query);        
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    if(deletePoint($row['point_id']) && deleteEvent($row['event_id'])){
        return createJson("ok","evento eliminado", $row);
    }else{
        return createJson("error","error al borra evento", null);
    }
}
?>

