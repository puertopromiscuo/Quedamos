<?php

include '../dao/eventDAO.php';
include '../dao/pointDAO.php';
include_once '../utils/conection.php';
if (!$link) {
    $link = getConection();
}

function insertEventManager($event_title, $event_description, $event_date, $user_id, $point_x, $point_y) {
    
    $point = insertPoint($point_x, $point_y);
    $point_id = $point[0]['point_id'];
    
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
/*
 * select event_id,event_title,event_description,event_date,user_id,p.point_id,point_x,point_y
from events as e, points as p
where e.point_id = p.point_id
 */

$point = insertEventManager('titulo1', 'descripcion1', '2014-01-27', '16', '111', '111');
var_dump($point);
?>

