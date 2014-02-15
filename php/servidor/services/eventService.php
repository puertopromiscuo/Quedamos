<?php

include '../manager/eventManager.php';
include '../../lib/toro/toro.php';
include_once './toroErrors.php';



Toro::serve(array(
    "/" => "services",
    "/getAllEventsManager" => "getAllEventsManager",
    "/insertEventManager" => "insertEventManager",
    "/getEventsWhereManager" => "getEventsWhereManager",
    "/deleteEventManager" => "deleteEventManager",
    "/singupEventManager" => "singupEventManager",
    
));

class services {

    function get() {
        echo "Services GET";
    }

    function post() {
        echo "Services POST";
    }

}

class getAllEventsManager {

    function post() {
        echo getAllEventsManager();
    }

}

class insertEventManager {

    function post() {
        echo insertEventManager(
                $_POST['event_title'],
                $_POST['event_description'],
                $_POST['event_date'],
                $_POST['user_id'],
                $_POST['point_x'],
                $_POST['point_y']               
             ) ;
    }

}
class getEventsWhereManager {

    function post() {
        echo getEventsWhereManager( 
                $_POST['where']               
             ) ;
    }

}

class deleteEventManager {

    function post() {
        echo deleteEventManager( 
                $_POST['event_id']               
             ) ;
    }

}

class singupEventManager {

    function post() {
        echo singupEventManager( 
                $_POST['user_id'],
                $_POST['event_id']                
             ) ;
    }

}

?>