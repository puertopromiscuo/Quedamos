<?php
include '../manager/eventManager.php';
include '../../lib/toro/toro.php';
include_once './toroErrors.php';



Toro::serve(array(
    "/" => "services",
    "/getAllEventsManager" => "getAllEventsManager",
));

class services {

    function get() {
        echo "Services GET";
    }
    function post(){
        echo "Services POST";
    }

}
class getAllEventsManager {

    function post() {
        echo getAllEventsManager();
    }

}
?>