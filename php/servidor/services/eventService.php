<?php

include '../manager/eventManager.php';
include '../../lib/toro/toro.php';
include_once './toroErrors.php';



Toro::serve(array(
    "/insertEventManager" => "insertEventManager",
    "/getEventManager" => "getEventManager",
    "/getAllEventsManager" => "getAllEventsManager",
    "/deleteEventManager" => "deleteEventManager",
    "/insertUserEventManager" => "insertUserEventManager",
    "/deleteUserEventManager" => "deleteUserEventManager"    
));

/* MAPA */
class insertEventManager {

    function post() {
        echo insertEventManager(
                $_POST['event_title'],
                $_POST['event_description'],
                $_POST['event_date'],
                $_POST['event_userid'],
                $_POST['event_x'],
                $_POST['event_y'],
                $_POST['event_type']
             ) ;
    }

}

class getEventManager{
    function post(){
        echo getEventManager(
                    $_POST['event_id']
                ); 
    }
}

class getAllEventsManager {

    function post() {
        echo getAllEventsManager();
    }

}

class deleteEventManager {

    function post() {
        echo deleteEventManager( 
                $_POST['event_id']               
             ) ;
    }

}

/* APUNTARSE */
class insertUserEventManager {

    function post() {
        echo insertUserEventManager( 
                $_POST['user_id'],
                $_POST['event_id']                
             ) ;
    }

}

class deleteUserEventManager {

    function post() {
        echo deleteUserEventManager( 
                $_POST['user_id'],
                $_POST['event_id']                
             ) ;
    }

}

?>