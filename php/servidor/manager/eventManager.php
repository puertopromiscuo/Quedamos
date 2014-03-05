<?php

include '../dao/eventDAO.php';
include_once '../utils/json.php';

function insertEventManager($event_title, $event_description, $event_date, $user_id, $event_x, $event_y) {
    $data = insertEvent($event_title, $event_description, $event_date, $user_id, $event_x, $event_y);     
    if(count($data)){
        return createJson("ok","evento creado", $data);
    }else{
        return createJson("error","error al crear evento",null);
    }  
}
function getEventManager($event_id){
    $data = getEvent($event_id);
    if(count($data)){
        return createJson("ok","evento recuperado", $data);
    }else{
        return createJson("error","error evento no encontrado:$event_id",null);
    }  
}

function getAllEventsManager(){        
    $data = getAllEvents();    
    if(count($data)){
        return createJson("ok","eventos del mapa recuperados", $data);
    }else{
        return createJson("error","no hay ningun evento del mapa",null);
    }
}


function getMyEventsManager($where=false){    
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
        return createJson("ok","eventos del usuario recuperados", $data);
    }else{
        return createJson("error","no tiene eventos propios $query", null);
    }    
}

function deleteEventManager($event_id){
    if(deleteEvent($event_id)){
        return createJson("ok","evento eliminado: $event_id",null);
    }else{
        return createJson("error","error al borra evento $event_id", null);
    }    
}

function insertUserEventManager($user_id,$event_id){ 
    if(!ifExistUserEvent($user_id, $event_id)){        
        insertUserEvent($user_id, $event_id);
        return createJson("ok","usuario apuntado",['event_id'=>$event_id]);
    }else{
        return createJson("error","error usuario ya esta apuntado a este evento", null);
    }  
}

function getMyManager($userId){    
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
        return createJson("ok","eventos en lo que esta recuperados", $data);
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

//var_dump(getEventManager(169));
//var_dump(insertEventManager("titulo", "descripbion", "2012-10-19", "3", "2", "4"));
//var_dump(getAllEventsManager());
//var_dump(deleteEventManager(165));
//var_dump(insertUserEventManager(10,30));

?>

