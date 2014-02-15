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
        return createJson("error","no hay eventos $query", $data);
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
        return createJson("error","no hay eventos $query", null);
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
        return createJson("error","error al borra evento $query", null);
    }
}
function registerEventManager($user_id,$event_id) {
    
    if(registerEvent($user_id,$event_id )){
        return createJson("ok","usuario apuntado",['event_id'=>$event_id]);
    }else{
        return createJson("error","error al crear evento", null);
    }  
}

function getRegisterEventManager($where=false){    
    global $link;
    $query = "SELECT * from VuserEvent";       
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
        return createJson("ok","eventos registrados recuperados", $data);
    }else{
        return createJson("error","no esta registrado en eventos $query", null);
    }    
}

function deleteregisterEventManager($user_id,$event_id){
    if(deleteregisterEvent($user_id,$event_id )){
        return createJson("ok","registro de evento eliminado",['event_id'=>$event_id]);
    }else{
        return createJson("error","error eliminar registro de evento", null);
    }  
}

?>

